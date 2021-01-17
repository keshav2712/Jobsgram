const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJobInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.applications = !isEmpty(data.applications) ? data.applications : 0;
  data.positions = !isEmpty(data.positions) ? data.positions : 0;
  if (Validator.isEmpty(data.title)) {
    errors.email = "Title field is required";
  }
  if (data.applications === 0){
      errors.applications = "Number of applications cant be 0";
  }
  if (data.positions === 0){
      errors.positions = "Number of positions cant be 0";
  }
  if (data.deadline > Date.now){
      errors.deadline = "Deadline already passed";
  }
  if (data.typeOfJob != 'Full-time' && data.typeOfJob != 'Part-Time' && data.typeOfJob != 'Work from Home'){
      errors.typeOfJob = "Type can only be Full-time, Part-Time or Work from Home";
  }
  if (data.duration > 6){
      errors.duration = "Duration of job cannot be more than 6 months";
  }
  if (data.duration < 0){
      errors.duration = "Duration of job cannot be less than 0 months";
  }
  if (data.salary < 0){
      errors.duration = "Salary of job cannot be negative";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};