const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ApplicantSchema = new Schema({
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
  skills: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
});
module.exports = Applicant = mongoose.model("applicants", ApplicantSchema);