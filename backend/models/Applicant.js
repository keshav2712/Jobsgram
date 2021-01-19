const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ApplicantSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  number: Number,
  education: [{
      institutionName: String,
      startYear: String,
      endYear: String
  }],
  skills: [String],
  rating: Number,
  jobs: [{
    job:{
      type: Schema.Types.ObjectId, 
      ref: 'jobs'
    },
    status: String,
    sop: String,
  }]
});
module.exports = Applicant = mongoose.model("applicants", ApplicantSchema);