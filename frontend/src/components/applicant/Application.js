import React, { useState, useEffect } from "react";
import moment from "moment";
import RatingIcon from "../../utils/rating";
import axios from "axios";

export default function Employee(props) {
  const application = props.application;
  const [rating, setRating] = React.useState(props.application.rating);
  const [hoverRating, setHoverRating] = React.useState(
    props.application.rating
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setRating(props.application.rating);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const status = () => {
    if (application.status === "applied") return "APPLIED";
    else if (application.status === "shortlisted") return "SHORTLISTED";
    else if (application.status === "accepted") return "ACCEPTED";
    else return "REJECTED";
  };
  const onSaveRating = (index) => {
    const newRating = {
      jobId: props.application.id._id,
      id: props.application.userId,
      rating: index,
    };
    axios
      .post("api/jobs/saveRating", newRating)
      .then((res) => {
        console.log(res.data);
        setRating(index);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card"
      style={{ minHeight: "130px", minWidth: "15vw", height: "100%" }}
    >
      <div className="row " style={{ display: "flex" }}>
        <div className="col s12">
          <div
            className="card-content black-text"
            style={{ paddingRight: "1rem", paddingBottom: "1rem" }}
          >
            <span
              className="card-title left-align"
              style={{ fontSize: "22px" }}
            >
              <b>{application.title}</b>
              <span style={{ fontSize: "14px", paddingLeft: "1rem" }}>
                {status()}
              </span>
            </span>
            <p
              className="left-align"
              style={{ padding: "0.3rem 0", fontSize: "16px" }}
            >
              Rs {application.salary} /-month
            </p>
            {application.dateOfJoining ? (
              <p className="left-align" style={sty}>
                <span style={{ fontSize: "0.85rem" }}>Joined:</span>&nbsp;
                {moment(application.dateOfJoining).format("LL")}
              </p>
            ) : null}
            <div className="box flex" style={{ paddingTop: "0.7rem" }}>
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <RatingIcon
                    key={index}
                    index={index}
                    rating={rating}
                    hoverRating={hoverRating}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onSaveRating={onSaveRating}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const sty = {
  padding: "0.3rem 0",
};
