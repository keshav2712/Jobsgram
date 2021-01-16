import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarLogged from '../layout/NavbarLogged'
import Jobs from './Jobs'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
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