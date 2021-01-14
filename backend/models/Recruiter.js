const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RecruiterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  education: [{
    institutionName: String,
    startYear: Date,
    endYear: Date
  }],
  skills: [String],
  rating: {
    type: Number,
    required: true
  },
});
module.exports = Recruiter = mongoose.model("recruiters", RecruiterSchema);