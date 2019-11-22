import React, { Component } from "react";
import Image1 from "./Images/bobby-roache-removebg-preview.png";
import Image2 from "./Images/paige-hathaway-removebg-preview.png";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";

import "./WellcomePage.css";

class WellcomePage extends Component {
  state = {
    show: false
  };

  handleClick = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div className="Wellcome">
        <Zoom delay={300}>
          <h1>Personal Trainer</h1>
        </Zoom>

        <div className="images">
          <Fade left delay={500}>
            <div className="image-1">
              <img src={Image1} alt="male trainer" />
            </div>
          </Fade>
          <Fade right delay={600}>
            <div className="image-2">
              <img src={Image2} alt="female trainer" />
            </div>
          </Fade>
        </div>
        <div>
          <Flip left opposite collapse when={this.state.show}>
            <div className="authButtons">
              <button>Login</button>
              <button>Create Account</button>
            </div>
          </Flip>
          <Flip left delay={900}>
            <div className="startButton">
              <button className="buttonText" onClick={this.handleClick}>
                <span className="getStarted">
                  {this.state.show ? "Hide Auth" : "Get Started"}
                </span>
                <h3 className="buttonIcon">&raquo;</h3>
              </button>
            </div>
          </Flip>
        </div>
      </div>
    );
  }
}

export default WellcomePage;
