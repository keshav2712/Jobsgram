import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

function StarIcon(props) {
  const { fill = "yellow" } = props;
  return (
    <svg
      style={{ height: "22px", width: "22px" }}
      fill={fill}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      ></path>
    </svg>
  );
}

export default function Applicant(props) {
  const [status, setStatus] = useState(props.applicant.status);
  const applicant = props.applicant.id;
  useEffect(() => {
    let isMounted = true;
    axios
      .post("api/applicant", applicant)
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
          for (let i = 0; i < res.data.jobsApplied.length; i++) {
            if (res.data.jobsApplied[i].status == "accepted") {
              setStatus("rejected");
              break;
            } else if (res.data.jobsApplied[i].id == props.job._id) {
              setStatus(res.data.jobsApplied[i].status);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const printSkills = () => {
    let skills = "";
    for (let i = 0; i < applicant.skills.length - 1; i++) {
      skills += applicant.skills[i] + ", ";
    }
    skills += applicant.skills[applicant.skills.length - 1];
    return skills;
  };
  const onReject = () => {
    if (status !== "accepted") {
      const newJob = {
        _id: props.job._id,
        applicant: {
          status: "rejected",
          id: applicant._id,
        },
      };
      axios
        .post("api/jobs/updateStatus", newJob)
        .then((res) => {
          console.log(res.data);
          setStatus("rejected");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onClick = () => {
    if (status === "applied") {
      const newJob = {
        _id: props.job._id,
        applicant: {
          status: "shortlisted",
          id: applicant._id,
        },
      };
      axios
        .post("api/jobs/updateStatus", newJob)
        .then((res) => {
          console.log(res.data);
          setStatus("shortlisted");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const newJob = {
        _id: props.job._id,
        applicant: {
          status: "accepted",
          id: applicant._id,
          dateOfJoining: new Date(),
        },
      };
      axios
        .post("api/jobs/updateStatusAccept", newJob)
        .then((res) => {
          console.log(res.data);
          setStatus("accepted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const colors = () => {
    if (status === "applied") {
      return "#5c74ec";
    } else if (status === "shortlisted") {
      return "#26a69a";
    } else {
      return "green";
    }
  };
  return status === "rejected" ? null : (
    <div className="card" style={{ minHeight: "200px", minWidth: "80vw" }}>
      <div className="row">
        <div className="col s8">
          <div className="card-content black-text">
            <span
              className="card-title left-align"
              style={{ fontSize: "22px" }}
            >
              <div className="row" style={{ marginBottom: "0.3rem" }}>
                <div className="col">
                  <b>Name:</b>&nbsp; {applicant.name}{" "}
                </div>
                <div
                  className="box flex"
                  style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                >
                  {[1, 2, 3, 4, 5].map((index) => {
                    var fill;
                    if (index <= applicant.rating) fill = "yellow";
                    else fill = "none";
                    return <StarIcon key={index} fill={fill} />;
                  })}
                </div>
              </div>
            </span>
            <p className="left-align" style={sty}>
              <b>Skills:</b> &nbsp;{printSkills(applicant.skills)}
            </p>
            <p className="left-align" style={sty}>
              <b>Date of Application:</b> &nbsp;
              {moment(props.applicant.dateOfApplication).format("ll")}
            </p>
            <p className="left-align" style={sty}>
              <b>SOP:</b> &nbsp;{props.applicant.sop}
            </p>
            <p className="left-align" style={sty}>
              <b>Education:</b> &nbsp;
              {applicant.education.map((education) => {
                return (
                  <span key={education._id}>
                    {education.institutionName} ({education.startYear}-
                    {education.endYear})
                    <br />
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <div className="col s1" style={{ height: "200px", display: "grid" }}>
          <button
            className="waves-effect waves-light btn-large button"
            onClick={onClick}
            style={{ margin: "auto", backgroundColor: colors() }}
          >
            {status === "applied"
              ? "SHORTLIST"
              : status === "shortlisted"
              ? "ACCEPT"
              : "ACCEPTED"}
          </button>
        </div>
        {status === "accepted" ? null : (
          <div className="col s3" style={{ height: "200px", display: "grid" }}>
            <button
              className="waves-effect waves-light btn-large button"
              onClick={onReject}
              style={{ margin: "auto", backgroundColor: "#CA0B00" }}
            >
              REJECT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const sty = {
  padding: "0.3rem 0",
};
