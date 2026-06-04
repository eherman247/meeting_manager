const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/userModel");
const { sendVerificationEmail } = require("../resend/email");

jest.mock("../resend/email", () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(),
  sendResetPasswordEmail: jest.fn().mockResolvedValue(),
}));

describe("Auth and password reset flows", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
    process.env.SECRET = process.env.SECRET || "testsecret";
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
    jest.clearAllMocks();
  });

  test("signup, verify email, login, forgot password, reset password, login again", async () => {
    const email = `api-test-${Date.now()}@example.com`;
    const password = "TestP@ss123!";
    const newPassword = "TestP@ss1234!";

    const signUpResponse = await request(app)
      .post("/api/auth/users/createUser")
      .send({ fname: "Api", lname: "Tester", email, password });

    expect(signUpResponse.status).toBe(200);
    expect(signUpResponse.body).toMatchObject({ email });
    expect(signUpResponse.body.token).toBeDefined();

    const createdUser = await User.findOne({ email }).lean();
    expect(createdUser).toBeTruthy();
    expect(createdUser.isVerified).toBe(false);
    expect(createdUser.verificationToken).toBeTruthy();

    const verifyResponse = await request(app)
      .patch("/api/auth/users/verify-email")
      .send({ token: createdUser.verificationToken });

    expect(verifyResponse.status).toBe(200);
    expect(verifyResponse.body).toMatchObject({ isVerified: true });

    const loginResponse = await request(app)
      .post("/api/auth/users/login")
      .send({ email, password });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toMatchObject({ email, isVerified: true });
    expect(loginResponse.body.token).toBeDefined();

    const forgotResponse = await request(app)
      .post("/api/auth/users/forgot-password")
      .send({ email });
    expect(forgotResponse.status).toBe(200);
    expect(forgotResponse.body).toMatchObject({
      message: "Password reset email sent",
    });

    const updatedUser = await User.findOne({ email }).lean();
    expect(updatedUser.resetPasswordToken).toBeTruthy();

    const resetResponse = await request(app)
      .patch(`/api/auth/users/reset-password/${updatedUser.resetPasswordToken}`)
      .send({ newPassword });

    expect(resetResponse.status).toBe(200);
    expect(resetResponse.body).toMatchObject({
      message: "Password reset successfully",
    });

    const loginAfterResetResponse = await request(app)
      .post("/api/auth/users/login")
      .send({ email, password: newPassword });

    expect(loginAfterResetResponse.status).toBe(200);
    expect(loginAfterResetResponse.body).toMatchObject({
      email,
      isVerified: true,
    });
    expect(loginAfterResetResponse.body.token).toBeDefined();
  });

  test("resends a verification email when verification fails", async () => {
    const email = `resend-test-${Date.now()}@example.com`;
    const password = "TestP@ss123!";

    const signUpResponse = await request(app)
      .post("/api/auth/users/createUser")
      .send({ fname: "Api", lname: "Tester", email, password });

    expect(signUpResponse.status).toBe(200);

    const createdUser = await User.findOne({ email });
    expect(createdUser).toBeTruthy();
    expect(createdUser.isVerified).toBe(false);
    expect(createdUser.verificationToken).toBeTruthy();
    expect(sendVerificationEmail).toHaveBeenCalledTimes(1);
    sendVerificationEmail.mockClear();

    createdUser.verificationTokenExpires = Date.now() - 1000;
    await createdUser.save();

    const resendResponse = await request(app)
      .post("/api/auth/users/resend-verification")
      .send({ token: createdUser.verificationToken });

    expect(resendResponse.status).toBe(200);
    expect(resendResponse.body).toMatchObject({
      message: "Verification email resent",
    });
    expect(sendVerificationEmail).toHaveBeenCalledTimes(1);

    const updatedUser = await User.findOne({ email }).lean();
    expect(updatedUser.verificationToken).toBeTruthy();
    expect(updatedUser.verificationToken).not.toBe(
      createdUser.verificationToken,
    );
    expect(
      new Date(updatedUser.verificationTokenExpires).getTime(),
    ).toBeGreaterThan(Date.now());
  });
});
