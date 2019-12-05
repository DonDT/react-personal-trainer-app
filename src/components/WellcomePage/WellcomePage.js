import React, { Component } from "react";
import Image1 from "./Images/bobby-roache-removebg-preview.png";
import Image2 from "./Images/paige-hathaway-removebg-preview.png";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./WellcomePage.css";

class WellcomePage extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    if (this.props.User.auth) {
      this.props.history.push("/customers");
    }
  }

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
              <img src={Image1} alt="male trainer" className="image_1_style" />
            </div>
          </Fade>
          <Fade right delay={600}>
            <div className="image-2">
              <img
                src={Image2}
                alt="female trainer"
                className="image_2_style"
              />
            </div>
          </Fade>
          <div className="footerDiv">
            <Flip left opposite collapse when={this.state.show}>
              <div className="authButtons">
                <button>
                  <Link to="/login_register" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </button>
                <button>
                  <Link to="/login_register" style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </button>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    User: state.User
  };
};

export default connect(mapStateToProps)(withRouter(WellcomePage));
