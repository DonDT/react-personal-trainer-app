import React, { Component } from "react";
import "./Authentication.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class LoginRegister extends Component {
  render() {
    return (
      <div className="main_container" style={{ backgroundColor: "white" }}>
        <div>
          <p className="LoginText">
            Login here as a newly registered customer or a new customer. Your
            credentials are highly secured and if you desire, you can chose
            multiplevel authentication.
          </p>
        </div>
        <div>
          <h3 className="loginText">Login Here</h3>
          <form noValidate autoComplete="off">
            <div className="firstInput">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="submitButton">
              <Button variant="outlined" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="loginText">Create New Account</h3>
          <form noValidate autoComplete="off">
            <div className="firstInput">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="lastInput">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
              />
            </div>

            <div className="submitButton">
              <Button variant="outlined" color="primary">
                Register
              </Button>
            </div>
          </form>
        </div>
        <div>
          <h2 className="loginText">Terms and Services</h2>
          <p className="LoginText">
            Upon regisering we invite you to review our terms and services
            involving data protection and use according to the EU regulations.
            We guarantee utmost privacy and non-disclosure of user information.{" "}
          </p>
        </div>
        {/* <div className="col-five">Div 5</div> */}
      </div>
    );
  }
}

export default LoginRegister;
