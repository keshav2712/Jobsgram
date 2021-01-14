import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class NavbarLogged extends Component {

onLogoutClick = e => {
    e.preventDefault();
    this.props.user.props.logoutUser();
  };

onProfile = e => {
    console.log()
}
  render() {
    return (
      <div className="Logged-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper black">
            <div
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center white-text"
            >
              <i className="material-icons">work</i>
              JOBSGRAM
            </div>
            <div className="left" style={{paddingLeft: '20px'}}>
              <button
                style={{
                  width: "100px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                onClick={this.onProfile}
                className="btn btn-medium waves-effect waves-light hoverable black"
              >
                Profile
              </button>
            </div>
            <div className="right-align" style={{paddingRight: '20px'}}>
              <button
                style={{
                  width: "100px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-medium waves-effect waves-light hoverable black"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavbarLogged;