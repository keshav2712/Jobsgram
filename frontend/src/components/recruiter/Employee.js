import React from "react";
import moment from "moment";
export default function Employee(props) {
  const employee = props.employee;
  return (
    <div className="card" style={{ minHeight: "130px", minWidth: "15vw" }}>
      <div className="row " style={{ display: "flex" }}>
        <div className="col s12">
          <div
            className="card-content black-text"
            style={{ paddingRight: "0" }}
          >
            <span
              className="card-title left-align"
              style={{ fontSize: "22px" }}
            >
              <b>{employee.name}</b>
            </span>
            <p
              className="left-align"
              style={{ padding: "0.3rem 0", fontSize: "18px" }}
            >
              {employee.title}
              {", "}
              <span style={{ fontSize: "0.9rem" }}>{employee.typeOfJob}</span>
            </p>
            <p className="left-align" style={sty}>
              <span style={{ fontSize: "0.85rem" }}>Joined:</span>&nbsp;
              {moment(employee.dateOfJoining).format("LL")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
const sty = {
  padding: "0.3rem 0",
};
