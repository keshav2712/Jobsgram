const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RecruiterSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  number: Number,
  bio: String,
  jobsCreated: {
    type: Schema.Types.ObjectId, 
    ref: 'jobs'
  }
});
module.exports = Recruiter = mongoose.model("recruiters", RecruiterSchema);