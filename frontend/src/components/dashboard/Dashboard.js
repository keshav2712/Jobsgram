import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarLogged from '../layout/NavbarLogged'

class Dashboard extends Component {
render() {
    const { user } = this.props.auth;
return (
      <React.Fragment>
        <NavbarLogged user={this}/>
        <div className="container" >
          <div className="row">
            <div className="col s12 center-align">
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