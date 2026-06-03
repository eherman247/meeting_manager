const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/userModel");

jest.mock("../resend/email", () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(),
  sendResetPasswordEmail: jest.fn().mockResolvedValue(),
}));

describe("Time session join routes", () => {
  let mongoServer;
  let token;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
    process.env.SECRET = process.env.SECRET || "testsecret";
    process.env.RESEND_API_KEY = "test";
    await mongoose.connect(process.env.MONGO_URI);

    const email = `test-${Date.now()}@example.com`;
    const password = "StrongP@ss123!";

    await request(app)
      .post("/api/auth/users/createUser")
      .send({ fname: "A", lname: "B", email, password });

    const user = await User.findOne({ email });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const loginResponse = await request(app)
      .post("/api/auth/users/login")
      .send({ email, password });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("create and join session with plural /timeSessions/join", async () => {
    const sessionCode = "joinme";

    const createResponse = await request(app)
      .post("/timeSessions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Join Test", password: "", sessionCode });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body.sessionCode).toBe(sessionCode);

    const joinResponse = await request(app)
      .post("/timeSessions/join")
      .send({ sessionCode, password: "" });

    expect(joinResponse.status).toBe(200);
    expect(joinResponse.body.sessionCode).toBe(sessionCode);
  });

  test("create and join session with singular /timeSession/join alias", async () => {
    const sessionCode = "join22";

    const createResponse = await request(app)
      .post("/timeSessions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Join Test 2", password: "", sessionCode });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body.sessionCode).toBe(sessionCode);

    const joinResponse = await request(app)
      .post("/timeSession/join")
      .send({ sessionCode, password: "" });

    expect(joinResponse.status).toBe(200);
    expect(joinResponse.body.sessionCode).toBe(sessionCode);
  });
});
