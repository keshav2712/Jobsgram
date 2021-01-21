import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from "./Job";

export default function JobListings(props) {
  const user = props.location.state.detail;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .post("api/recruiter", user)
      .then((res) => {
        setJobs(res.data.jobsCreated);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="Navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper" style={{ backgroundColor: "#2E284C" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontColor: "#F0F1F7",
              }}
              className="col s5 brand-logo center"
            >
              <i className="material-icons">work</i>
              JOBSGRAM
            </div>
            <div className="left" style={{ paddingLeft: "20px" }}>
              <button
                style={{
                  width: "100px",
                  letterSpacing: "1.5px",
                  backgroundColor: "#2E284C",
                }}
                onClick={(e) => {
                  props.history.push("/dashboard");
                }}
                className="btn btn-medium"
              >
                Home
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="container valign-wrapper" style={{ width: "80%" }}>
        <div className="row">
          <div className="col s12 center-align">
            <div className="container" style={{ margin: "0" }}>
              <div
                className="row"
                style={{ width: "500px", marginTop: "2rem" }}
              >
                <div className="col s10 offset-s1">
                  <h4 className="grey-text text-darken-4 header left-align ">
                    <b>Jobs Listed</b> by you
                  </h4>
                </div>
              </div>
              {jobs.map((job) => (
                <Job
                  key={job._id}
                  job={job}
                  user={user}
                  history={props.history}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
