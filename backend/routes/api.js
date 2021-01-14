const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const User = require("../models/User");
const Jobs = require("../models/Job");
const Recruiter = require("../models/Recruiter");
const Applicant = require("../models/Applicant");


//User
router.route('/users').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err));
});
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateJobInput = require("../validation/job");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/users/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/users/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user: user,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//getting a single user by id
router.get('/users/view', (req, res) => {
  console.log(req.body)
    User.findOne({ _id: req.body.id })
      .then(user => {
         res.json(user)
      })
      .catch(err => res.status(400).json(err));
});


//Jobs
router.route('/jobs').get((req, res) => {
    Job.find()
      .then(jobs => res.json(jobs))
      .catch(err => res.status(400).json(err));
});

router.post("/jobs/add", (req, res) => {
  const { errors, isValid } = validateJobInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newJob = new Job({
        title: req.body.title,
        applications: req.body.applications,
        positions: req.body.positions,
        dateOfPosting: req.body.dateOfPosting,
        skills: req.body.skills,
        deadline: req.body.deadline,
        typeOfJob: req.body.typeOfJob,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: req.body.rating
      });
      newJob
            .save()
            .then(job => res.json(job))
            .catch(err => console.log(err));
});

module.exports = router;