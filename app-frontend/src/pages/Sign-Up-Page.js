import React, { Component } from "react";
import "../App.css";

import SignUp from "../components/SignUp"

class SignUpPage extends Component {
  
  render() {
    return (
      <div id='home'>
        <SignUp />
      </div>
    );
  }
}

export default SignUpPage;