import React, { Component } from "react";
import "../App.css";

import Login from "../login/Login"

class LoginPage extends Component {
  
  render() {
    return (
      <div id='home'>
        <Login />
      </div>
    );
  }
}

export default LoginPage;