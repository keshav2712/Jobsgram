import React, { useState, useEffect } from "react";

export default function MyApplication(props) {
  const userData = props.location.state.detail;
  return (
    <React.Fragment>
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
            <ul id="nav-mobile" className="left">
              <li>
                <div
                  className="btn navb"
                  onClick={(e) => {
                    props.history.push({
                      pathname: "/profilea",
                      state: { detail: userData },
                    });
                  }}
                >
                  Profile
                </div>
              </li>
              <li>
                <div
                  className="btn navb"
                  onClick={(e) => {
                    props.history.push("/dashboard");
                  }}
                >
                  Home
                </div>
              </li>
            </ul>
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
                    Your <b>APPLICATIONS</b>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
