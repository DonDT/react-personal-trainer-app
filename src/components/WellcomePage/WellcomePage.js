import React, { Component } from "react";
import Image1 from "./Images/bobby-roache-removebg-preview.png";
import Image2 from "./Images/paige-hathaway-removebg-preview.png";

import "./WellcomePage.css";

class WellcomePage extends Component {
  render() {
    return (
      <div className="Wellcome">
        <h1>Personal Trainer</h1>

        <div className="images">
          <div className="image-1">
            <img src={Image1} alt="male image" />
          </div>
          <div className="image-2">
            <img src={Image2} alt="female image" />
          </div>
        </div>
        <div className="startButton">
          <h3>&raquo;</h3>
          <button className="buttonText">Get Started</button>
        </div>
      </div>
    );
  }
}

export default WellcomePage;
