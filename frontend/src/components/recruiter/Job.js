import React from "react";

export default function Job(props) {
  const job = props.job;
  const user = props.user;
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
  const getAccepteds = () => {
    let positionsLeft = job.positions;
    job.applicants.forEach((applicant) => {
      if (applicant.status === "accepted") {
        positionsLeft--;
      }
    });
    return positionsLeft;
  };
  const getTimes = () => {
    var date = new Date(job.deadline);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  return (
    <div className="card" style={{ minHeight: "200px", minWidth: "80vw" }}>
      <div className="row">
        <div
          className="col s8"
          onClick={(e) => {
            props.history.push({
              pathname: "/applications",
              state: { detail: job },
            });
          }}
        >
          <div className="card-content black-text">
            <span
              className="card-title left-align"
              style={{ fontSize: "22px" }}
            >
              <b>Job Title:</b>&nbsp; {job.title}
            </span>
            <p className="left-align" style={sty}>
              <b>Date of Posting:</b> &nbsp;{getDates(job.dateOfPosting)}
            </p>
            <p className="left-align" style={sty}>
              <b>Deadline:</b> &nbsp;{getDates(job.deadline)} at {getTimes()}
            </p>
            <p className="left-align" style={sty}>
              <b>Number of Applicants:</b> &nbsp;{job.applicants.length}
            </p>
            <p className="left-align" style={sty}>
              <b>Positions Left:</b> &nbsp;
              {getAccepteds()}
            </p>
          </div>
        </div>
        <div className="col s1" style={{ height: "200px", display: "grid" }}>
          <button
            className="waves-effect waves-light btn-large button"
            onClick={(e) => {
              props.history.push({
                pathname: "/editJob",
                state: { detail: [job, user] },
              });
            }}
            style={{ margin: "auto" }}
          >
            Edit
          </button>
        </div>
        <div className="col s3" style={{ height: "200px", display: "grid" }}>
          <button
            className="waves-effect waves-light btn-large button"
            onClick={(e) => {}}
            style={{ margin: "auto", backgroundColor: "#CA0B00" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
const sty = {
  padding: "0.3rem 0",
};
