import React from "react";
import { Button } from "reactstrap";
import "../App.css";

const Hero = () => (
  <div>
    <main className="cover-page" id="hero">
      <section className="wrapped-page">
        <div className="item-center">
          <h1>Splunk Self-Service</h1>
          <h3>...
          </h3>
          <Button outline color="warning" href="#availabilityBody">
            Explore
          </Button>
        </div>
      </section>
    </main>
  </div>
);

export default Hero;
