import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class NavbarLogged extends Component {



onProfile = e => {
    console.log(this.props.user.state.userData)
}
  render() {
    return (
      <h1>et</h1>
    )
  }
}
export default NavbarLogged;