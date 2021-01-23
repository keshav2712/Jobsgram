import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Jobs from "./Jobs";
import AddJobs from "./AddJobs";
import axios from "axios";

class Dashboard extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      userData: {},
    };
  }
  componentDidMount() {
    this._isMounted = true;

    const { user } = this.props.auth.user;
    if (user.role === "applicants") {
      axios
        .post("/api/applicant", user)
        .then((res) => {
          if (this._isMounted) {
            this.setState({ userData: res.data });
            this.setState((prevState) => ({
              userData: { ...prevState.userData, role: "applicants" },
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/recruiter", user)
        .then((res) => {
          this.setState({ userData: res.data });
          this.setState((prevState) => ({
            userData: { ...prevState.userData, role: "recruiters" },
          }));
        })
        .catch((err) => console.log(err));
    }
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth.user;
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
              <ul id="nav-mobile" className="right">
                <li>
                  <div onClick={this.onLogoutClick} className="btn navb">
                    Logout
                  </div>
                </li>
              </ul>
              <ul id="nav-mobile" className="left">
                <li>
                  <div
                    className="btn navb"
                    onClick={(e) => {
                      this.props.history.push({
                        pathname:
                          user.role === "applicants"
                            ? "/profilea"
                            : "/profiler",
                        state: { detail: this.state.userData },
                      });
                    }}
                  >
                    Profile
                  </div>
                </li>
                {user.role === "applicants" ? (
                  <li>
                    <div
                      className="btn navb"
                      onClick={(e) => {
                        this.props.history.push({
                          pathname: "/myApplications",
                          state: { detail: this.state.userData },
                        });
                      }}
                    >
                      My Applications
                    </div>
                  </li>
                ) : (
                  <li>
                    <div
                      className="btn navb"
                      onClick={(e) => {
                        this.props.history.push({
                          pathname: "/jobListing",
                          state: { detail: this.state.userData },
                        });
                      }}
                    >
                      Job Listings
                    </div>
                  </li>
                )}
                {user.role === "applicants" ? null : (
                  <li>
                    <div
                      className="btn navb"
                      onClick={(e) => {
                        this.props.history.push({
                          pathname: "/myEmployees",
                          state: { detail: this.state.userData },
                        });
                      }}
                    >
                      My Employees
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
        <div className="container valign-wrapper" style={{ width: "80%" }}>
          <div className="row">
            <div className="col s12">
              {user.role === "applicants" ? (
                <Jobs user={this.state.userData} />
              ) : (
                <AddJobs user={this.state.userData} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
