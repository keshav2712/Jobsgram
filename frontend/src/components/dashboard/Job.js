import React, { useState, useEffect } from "react";
import "./../../index.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

function Job(props) {
  const job = props.job;
  const [open, setOpen] = React.useState(false);
  const [sop, setSop] = useState("");
  const [buttonValue, setButtonValue] = useState("APPLY");
  const [error, setError] = useState("");

  useEffect(() => {
    if (job.applicants.length >= job.applications) {
      setButtonValue("FULL");
    }
    for (var i = 0; i < job.applicants.length; i++) {
      if (job.applicants[i].id === props.user._id) {
        setButtonValue("APPLIED");
        break;
      }
    }
  });
  const handleClickOpen = () => {
    getTimes();
    if (buttonValue === "APPLY") {
      setOpen(true);
    }
  };
  const handleValidation = () => {
    let error = "";
    let valid = true;
    if (sop === "") {
      valid = false;
      error = "SOP can't be empty";
    }
    if (sop.length > 250) {
      valid = false;
      error = "SOP can't be more than 250 words";
    }
    setError(error);
    return valid;
  };
  const handleClose = () => {
    setOpen(false);
    setSop("");
    setError("");
  };
  const apply = (e) => {
    if (handleValidation()) {
      const newJob = {
        id: job._id,
        applicant: {
          id: props.user._id,
          status: "applied",
          sop: sop,
          dateOfApplication: new Date(),
        },
      };

      axios
        .post("api/jobs/addApplicant", newJob)
        .then((res) => {
          console.log(res.data);
          setOpen(false);
          setButtonValue("APPLIED");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const colors = () => {
    if (buttonValue === "APPLIED") {
      return "#26a69a";
    } else if (buttonValue === "FULL") {
      return "#CA0B00";
    } else {
      return "#5c74ec";
    }
  };
  const getTimes = () => {
    var date = new Date(job.deadline);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const getDates = (date) => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dateObj = new Date(date);
    return (
      dateObj.getDate() +
      " " +
      monthNames[dateObj.getMonth()] +
      " " +
      dateObj.getFullYear()
    );
  };
  return (
    <div className="card" style={{ minHeight: "200px", minWidth: "80vw" }}>
      <div className="row">
        <div className="col s9">
          <div className="card-content black-text">
            <span
              className="card-title left-align"
              style={{ fontSize: "22px" }}
            >
              <b>Job Title:</b> {job.title}
            </span>
            <p className="left-align" style={sty}>
              <b>Recruiter:</b> &nbsp;{job.recruiterName}
            </p>
            <p className="left-align" style={sty}>
              <b>Salary:</b> &nbsp;Rs {job.salary}/month
            </p>
            <p className="left-align" style={sty}>
              <b>Duration:</b> &nbsp;
              {job.duration ? job.duration : "Indefinite"}{" "}
              {job.duration ? "months" : null}
            </p>
            <p className="left-align" style={sty}>
              <b>Type:</b> &nbsp;{job.typeOfJob}
            </p>
            <p className="left-align" style={sty}>
              <b>Deadline:</b> &nbsp;{getDates(job.deadline)} at {getTimes()}
            </p>
          </div>
        </div>
        <div className="col s3" style={{ height: "200px", display: "grid" }}>
          <button
            className="waves-effect waves-light btn-large button"
            onClick={handleClickOpen}
            style={{ margin: "auto", backgroundColor: colors() }}
          >
            {buttonValue}
          </button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Statement of Purpose</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write a Statement of Purpose for the Job you are applying to
          </DialogContentText>
          <TextField
            className="browser-default"
            autoFocus
            margin="dense"
            id="sop"
            label="Statement of purpose"
            type="text"
            fullWidth
            multiline
            value={sop}
            rows={1}
            rowsMax={8}
            onChange={(e) => {
              setSop(e.target.value);
            }}
          />
          <span className="red-text" style={{ fontSize: "0.8rem" }}>
            {error}
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={apply} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const sty = {
  padding: "0.3rem 0",
};
export default Job;
