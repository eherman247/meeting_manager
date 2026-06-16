const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./app");
const User = require("./models/userModel");

(async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.SECRET = "testsecret";
  await mongoose.connect(process.env.MONGO_URI);

  const email = `test-${Date.now()}@example.com`;
  const password = "StrongP@ss123!";

  const signUpResponse = await request(app)
    .post("/api/auth/users/createUser")
    .send({
      fname: "A",
      lname: "B",
      email,
      password,
    });

  const user = await User.findOne({ email });
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  const login = await request(app).post("/api/auth/users/login").send({
    email,
    password,
  });

  const token = login.body.token;
  const sessionCode = "abc123";

  const create = await request(app)
    .post("/timeSessions")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Test Session", password: "", sessionCode });

  const join = await request(app)
    .post("/timeSessions/join")
    .send({ sessionCode, password: "" });

  await mongoose.disconnect();
  await mongoServer.stop();
})();
