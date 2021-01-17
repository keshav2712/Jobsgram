import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class NavbarLogged extends Component {

onLogoutClick = e => {
    e.preventDefault();
    this.props.user.props.logoutUser();
  };

onProfile = e => {
    console.log(this.props.user.props.auth.user.user)
}
  render() {
    return (
      <div className="Navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper" style = {{backgroundColor: '#2E284C'}}>
            <div
              style={{
                fontFamily: "monospace",
                fontColor: '#F0F1F7'
              }}
              className="col s5 brand-logo center"
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
                  backgroundColor: '#2E284C'
                }}
                onClick={this.onProfile}
                className="btn btn-medium"
              >
                <Link
                  // to={{
                  //   pathname: "/page",
                  //   data: data
                  // }}
                >
                Profile
                </Link>
              </button>
            </div>
            <div className="right-align" style={{paddingRight: '20px'}}>
              <button
                style={{
                  width: "100px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  backgroundColor: '#2E284C'
                }}
                onClick={this.onLogoutClick}
                className="btn btn-medium"
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