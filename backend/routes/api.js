const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

const User = require("../models/User");
const Jobs = require("../models/Job");
const Recruiter = require("../models/Recruiter");
const Applicant = require("../models/Applicant");
var nodemailer = require("nodemailer");

const mailer = (email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jobsgram@gmail.com",
      pass: "lemonpass",
    },
  });

  var mailOptions = {
    from: "jobsgram@gmail.com",
    to: email,
    subject: "Congratulations! You have just been hired! Lesssgooo",
    text:
      "Dear Applicant, \nCongratulations! You have been selceted for the job you applied from our website-JOBSGRAM\nRegards,\nJobsgram",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
//User
router.route("/users").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(err));
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

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      let id;
      if (req.body.role == "applicants") {
        const newApplicant = new Applicant({
          _id: new mongoose.Types.ObjectId(),
          email: "",
          education: [{}],
          skills: [],
        });
        id = newApplicant._id;
        newApplicant.save().catch((err) => console.log(err));
      } else {
        const newRecruiter = new Recruiter({
          _id: new mongoose.Types.ObjectId(),
        });
        id = newRecruiter._id;
        newRecruiter.save().catch((err) => console.log(err));
      }
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        userId: id,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
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
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "username not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(payload, keys.secretOrKey, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            user: user,
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//getting a single user by id
router.get("/users/view", (req, res) => {
  User.findOne({ _id: req.body.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json(err));
});

//Applicant
router.route("/applicant/save").post((req, res) => {
  Applicant.findOne({ _id: req.body.id }).then((applicant) => {
    applicant.name = req.body.name;
    applicant.email = req.body.email;
    applicant.number = req.body.number;
    applicant.education = req.body.education;
    applicant.skills = req.body.skills;
    applicant
      .save()
      .then((applicant) => res.json(applicant))
      .catch((err) => res.status(400).json(err));
  });
});

router.route("/applicant").post((req, res) => {
  Applicant.findOne({ _id: req.body.userId ? req.body.userId : req.body.id })
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).json({ notfound: "Applicant not found" });
      } else {
        res.json(applicant);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//Recruiter
router.route("/recruiter/save").post((req, res) => {
  Recruiter.findOne({ _id: req.body.id }).then((recruiter) => {
    recruiter.name = req.body.name;
    recruiter.email = req.body.email;
    recruiter.number = req.body.number;
    recruiter.bio = req.body.bio;
    recruiter
      .save()
      .then((recruiter) => res.json(recruiter))
      .catch((err) => res.status(400).json(err));
  });
});
router.route("/recruiter").post((req, res) => {
  Recruiter.findOne({ _id: req.body.userId ? req.body.userId : req.body._id })
    .populate({
      path: "jobsCreated",
      model: "jobs",
      populate: { path: "applicants.id", model: "applicants" },
    })
    .exec((err, recruiter) => {
      if (err) {
        res.status(400).json(err);
      } else res.status(200).json(recruiter);
    });
});
//Jobs
router.route("/jobs").get((req, res) => {
  Job.find()
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json(err));
});
router.post("/jobs/add", (req, res) => {
  // Check validation
  Recruiter.findOne({ _id: req.body.userId }).then((recruiter) => {
    const newJob = new Job({
      _id: new mongoose.Types.ObjectId(),
      recruiterName: recruiter.name,
      title: req.body.title,
      applications: req.body.applications,
      positions: req.body.positions,
      dateOfPosting: req.body.dateOfPosting,
      skills: req.body.skills,
      deadline: req.body.deadline,
      typeOfJob: req.body.typeOfJob,
      duration: req.body.duration,
      salary: req.body.salary,
    });
    recruiter.jobsCreated.push(newJob._id);
    recruiter
      .save()
      .then((recruiter) => {
        newJob
          .save()
          .then((job) => res.json(job))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  });
});

router.post("/jobs/update", (req, res) => {
  Job.findOne({ _id: req.body.id }).then((job) => {
    job.applications = req.body.applications;
    job.positions = req.body.positions;
    job.deadline = req.body.deadline;
    job
      .save()
      .then((job) => res.json(job))
      .catch((err) => console.log(err));
  });
});

router.post("/jobs/addApplicant", (req, res) => {
  let count = 0;
  Job.findOne({ _id: req.body.id }).then((job) => {
    Applicant.findOne({ _id: req.body.applicant.id }).then((applicant) => {
      applicant.jobsApplied.forEach((job) => {
        if (job.status != "rejected") count++;
      });
      if (count > 10) {
        return res.json("error");
      } else {
        applicant.jobsApplied.push({ id: req.body.id, status: "applied" });
        applicant.save().then(() => {
          job.applicants.push(req.body.applicant);

          job
            .save()
            .then((job) => res.json(job))
            .catch((err) => res.status(400).json(err));
        });
      }
    });
  });
});

router.post("/jobs/updateStatus", (req, res) => {
  Job.findOne({ _id: req.body._id }).then((job) => {
    job.applicants.forEach((applicant, i) => {
      if (req.body.applicant.id == applicant.id) {
        if (req.body.applicant.status) {
          job.applicants[i].status = req.body.applicant.status;
          if (req.body.applicant.status === "accepted") {
            Applicant.findOne({ _id: req.body.applicant.id }).then(
              (applicant) => {
                mailer(applicant.email);
                applicant.jobsApplied.forEach((job) => {
                  if (job.id != req.body._id) {
                    job.status = "rejected";
                  } else {
                    job.status = "accepted";
                  }
                });
                applicant.save();
              }
            );
          }
        }
        if (req.body.applicant.dateOfJoining) {
          job.applicants[i].dateOfJoining = req.body.applicant.dateOfJoining;
        }
        if (req.body.applicant.rating) {
          job.applicants[i].rating = req.body.applicant.rating;
        }
        job
          .save()
          .then((job) => res.json(job.applicants[i]))
          .catch((err) => console.log(err));
      }
    });
  });
});

module.exports = router;
