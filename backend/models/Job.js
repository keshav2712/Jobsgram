const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Schema = mongoose.Schema;
// Create Schema
const JobSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  recruiter: {
    type: Schema.Types.ObjectId, 
    ref: 'recruiters'
  },
  applications: {
    type: Number,
    required: true
  },
  positions: {
    type: Number,
    required: true
  },
  applicants: [{
    type: Schema.Types.ObjectId, 
    ref: 'applicants'
  }],
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