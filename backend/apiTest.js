require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const fetch = global.fetch;
const User = require("./models/userModel");

const BASE_URL = "http://localhost:4000";

const randomId = Math.floor(Math.random() * 1e9);
const email = `api-test-${randomId}@example.com`;
const password = "TestP@ss123!";
const newPassword = "TestP@ss1234!";

const log = (label, value) =>

const request = async (path, opts = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const body = await res.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    json = body;
  }
  return { status: res.status, json };
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  log("testEmail", email);

  const signUp = await request("/api/auth/users/createUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fname: "Api", lname: "Tester", email, password }),
  });
  log("createUser result", signUp);

  const user = await User.findOne({ email }).lean();
  log("db user found", {
    exists: !!user,
    verified: user?.isVerified,
    verificationToken: user?.verificationToken ? "present" : "missing",
    resetPasswordToken: user?.resetPasswordToken ? "present" : "missing",
  });

  if (!user) {
    console.error("User was not created; aborting remaining API flow.");
    process.exit(1);
  }

  const verifyEmail = await request("/api/auth/users/verify-email", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: user.verificationToken }),
  });
  log("verifyEmail result", verifyEmail);

  const login1 = await request("/api/auth/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  log("login after verify result", login1);

  const forgot = await request("/api/auth/users/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  log("forgotPassword result", forgot);

  const updatedUser = await User.findOne({ email }).lean();
  log("db user after forgot", {
    resetPasswordToken: updatedUser?.resetPasswordToken ? "present" : "missing",
    resetPasswordExpires: updatedUser?.resetPasswordExpires,
  });

  if (!updatedUser?.resetPasswordToken) {
    console.error(
      "No resetPasswordToken generated; aborting reset-password test.",
    );
    process.exit(1);
  }

  const reset = await request(
    `/api/auth/users/reset-password/${updatedUser.resetPasswordToken}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    },
  );
  log("resetPassword result", reset);

  const login2 = await request("/api/auth/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: newPassword }),
  });
  log("login after reset result", login2);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Error during API flow:", err);
  process.exit(1);
});
