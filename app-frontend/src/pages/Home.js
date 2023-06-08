import React, { Component } from "react";
import "../App.css";

import Hero from "../components/Hero"
import CardCollection from "../components/CardCollection";
import PullRoles from "../components/PullRoles";

class Home extends Component {
  render() {
    return (
      <div id='home'>
        <Hero />
        <PullRoles />
      </div>
    );
  }
}

export default Home;