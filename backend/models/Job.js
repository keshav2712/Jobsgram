const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;
// Create Schema
const JobSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  recruiterName: String,
  applications: {
    type: Number,
    required: true,
  },
  positions: {
    type: Number,
    required: true,
  },
  applicants: [
    {
      id: String,
      status: String,
      sop: String,
      rating: Number,
      dateOfJoining: String,
      dateOfApplication: String,
    },
  ],
  dateOfPosting: {
    type: String,
    default: Date.now,
  },
  deadline: {
    type: String,
    default: Date.now,
  },
  skills: {
    type: [String],
    required: true,
  },
  typeOfJob: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

JobSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });

module.exports = Job = mongoose.model("jobs", JobSchema);
