const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Schema = mongoose.Schema;
// Create Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  recruiter: {
    type: Schema.Types.ObjectId, 
    ref: 'Recruiter'
  },
  applications: {
    type: Number,
    required: true
  },
  positions: {
    type: Number,
    required: true
  },
  dateOfPosting: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    default: Date.now
  },
  skills: {
    type: [String],
    required: true
  },
  typeOfJob: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
});

JobSchema.plugin(mongoose_fuzzy_searching, { fields: ['title']});

module.exports = Job = mongoose.model("jobs", JobSchema);