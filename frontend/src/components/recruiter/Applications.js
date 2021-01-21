import React from "react";
import Applicant from "./Applicant";
export default function Applications(props) {
  const job = props.location.state.detail;
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
        <div className="row" style={{ width: "100%" }}>
          <div className="col s12 center-align">
            <div className="row" style={{ marginTop: "2rem" }}>
              <div className="col s10 offset-s1">
                <h4 className="grey-text text-darken-4 header left-align ">
                  <b>Applications</b> for {job.title}
                </h4>
                {job.applicants.map((applicant) => (
                  <Applicant applicant={applicant} key={job._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
