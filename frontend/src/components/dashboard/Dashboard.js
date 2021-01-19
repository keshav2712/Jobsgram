import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarLogged from '../layout/NavbarLogged'
import Jobs from './Jobs'
import axios from "axios";
import {getUser} from '../../utils/saveUser'
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      tab: {
        profile: false,
        myApplications: false,
        jobListings: false,
        myEmployees: false,
      }
    };
  }
  componentDidMount() {
    const { user } = this.props.auth.user;
    if(user.role == "applicants"){
        axios
        .post("/api/applicant", user)
        .then(res => {
          this.setState({userData: res.data});
          this.setState(prevState => ({userData: {...prevState.userData, role: "applicants"}}))
        }) 
        .catch(err => console.log(err));
    } else {
        axios
        .post("/api/recruiter", user)
        .then(res => {
          this.setState({userData: res.data});
          this.setState(prevState => ({userData: {...prevState.userData, role: "recruiters"}}))
        }) 
        .catch(err => console.log(err));
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth.user;
    console.log(this.state.userData)
return (
      <React.Fragment>
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
                    letterSpacing: "1.5px",
                    backgroundColor: '#2E284C'
                  }}
                  onClick={(e) => {this.props.history.push({pathname: user.role=="applicants" ? "/profilea" :"/profiler", state: {detail: this.state.userData}})}}
                  className="btn btn-medium"
                >
                  Profile
                </button>
              </div>
              <div className="right-align" style={{paddingRight: '20px'}}>
                <button
                  style={{
                    width: "100px",
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
        <div className="container" style={{width: '80%'}} >
          <div className="row">
            <div className="col s12 center-align">
            {user.role == "applicants" ? <Jobs/> : <h1>Recruiter</h1>}  
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);