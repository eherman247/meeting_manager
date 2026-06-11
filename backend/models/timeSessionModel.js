const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const timeSessionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionCode: {
    type: String,
    lowercase: true,
    minLength: 6,
    maxLength: 6,
    unique: true,
    required: true,
  },
});

timeSessionSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (!this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

timeSessionSchema.methods.comparePassword = async function (candidate) {
  if (!this.password) return true;
  return bcrypt.compare(candidate || "", this.password);
};

module.exports = mongoose.model("TimeSession", timeSessionSchema);
