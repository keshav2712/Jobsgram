const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  role: {
    type: String,
    enum: ['Applicant', 'Recruiter'],
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = User = mongoose.model("users", UserSchema);