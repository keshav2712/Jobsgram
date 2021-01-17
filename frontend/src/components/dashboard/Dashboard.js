import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarLogged from '../layout/NavbarLogged'
import Jobs from './Jobs'
import axios from "axios";
import {getUser} from '../../utils/saveUser'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    const { user } = this.props.auth.user;
    console.log(user)
    if(user.role == "applicants"){
        axios
        .get("http://localhost:5000/api/applicant", user)
        .then(res => console.log(res)) 
        .catch(err => console.log(err));
    } else {
        axios
        .get("http://localhost:5000/api/recruiter", user)
        .then(res => res) 
        .catch(err => console.log(err));
    }
  }
render() {
    const { user } = this.props.auth.user;
return (
      <React.Fragment>
        <NavbarLogged user={this}/>
        <div className="container" style={{width: '80%'}} >
          <div className="row">
            <div className="col s12 center-align">
            <Jobs/>
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