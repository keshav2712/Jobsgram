import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

export default function Applicant(props) {
  const [status, setStatus] = useState(props.applicant.status);
  const applicant = props.applicant.id;
  useEffect(() => {
    let isMounted = true;
    let newJob = {
      _id: props.job._id,
      applicant: {
        id: applicant._id,
      },
    };
    axios
      .post("api/jobs/updateStatus", newJob)
      .then((res) => {
        if (isMounted) {
          setStatus(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, [status]);

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
        .post("api/jobs/updateStatus", newJob)
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
              <b>Name:</b>&nbsp; {applicant.name}
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
