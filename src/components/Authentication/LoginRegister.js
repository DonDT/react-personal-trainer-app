import React, { Component } from "react";
import "./Authentication.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ValidationRules from "../../utilsFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn, signUp, autoSignIn } from "../../store/actions/user_actions";
import { setTokens, getTokens } from "../../authActions";

class LoginRegister extends Component {
  state = {
    type: "Login",
    action: "Login",
    hasErrors: false,
    form: {
      login: {
        email: {
          value: "",
          valid: false,
          type: "textInput",
          rules: {
            isRequired: true,
            isEmail: true
          }
        },
        password: {
          value: "",
          valid: false,
          type: "textInput",
          rules: {
            isRequired: true,
            minLength: 6
          }
        }
      },
      register: {
        name: {
          value: "",
          valid: false,
          type: "textInput",
          rules: {
            isRequired: true
          }
        },
        email: {
          value: "",
          valid: false,
          type: "textInput",
          rules: {
            isRequired: true,
            isEmail: true
          }
        },

        password: {
          value: "",
          valid: false,
          type: "textInput",
          rules: {
            isRequired: true,
            minLength: 6
          }
        },
        confirmPassword: {
          value: "",
          valid: false,
          type: "textinput",
          rules: {
            confirmPassword: "password"
          }
        }
      }
    }
  };

  componentDidMount() {
    getTokens(value => {
      if (value) {
        console.log(value.refreshToken);
      }
      if (value) {
        this.props.autoSignIn(value.refreshToken).then(() => {
          if (!this.props.User.auth.token) {
            this.props.history.push("/login_register");
          } else {
            setTokens(this.props.User.auth, () => {
              this.props.history.push("/customers");
            });
          }
        });
      }
    });
  }

  updateInput = (event, name, kind) => {
    this.setState({
      hasErrors: false
    });
    let formCopy = this.state.form;
    formCopy[kind][name].value = event.target.value;

    let rules = formCopy[kind][name].rules;
    let value = event.target.value;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[kind][name].valid = valid;
    this.setState({
      form: formCopy
    });
  };

  manageAccess = () => {
    // since we have access to state through redux, when the user sign in
    if (!this.props.User.auth.uid) {
      // if there is no id throw an error
      this.setState({ hasErrors: true });
    } else {
      // else pass the data, set the state of errors to false, and go next.
      setTokens(this.props.User.auth, () => {
        //console.log("Tokens");
        this.setState({ hasErrors: false });
        this.props.history.push("/customers");
        this.setState({ userIsSignedIn: true });
      });
    }
  };

  submitUserInfo = authType => {
    let isFormValid = true;
    let formToSubmit = {};

    const registerFormCopy = this.state.form.register;
    const loginFormCopy = this.state.form.login;

    if (authType === "Login") {
      for (let key in loginFormCopy) {
        isFormValid = isFormValid && loginFormCopy[key].value;
        formToSubmit[key] = loginFormCopy[key].value;
      }
    } else {
      for (let key in registerFormCopy) {
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && registerFormCopy[key].value;
          formToSubmit[key] = registerFormCopy[key].value;
        }
      }
    }

    if (isFormValid) {
      if (authType === "Login") {
        this.props.signIn(formToSubmit).then(() => {
          console.log("Login in");
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({ hasErrors: true });
    }

    console.log(formToSubmit);
  };

  render() {
    return (
      <div className="main_container" style={{ backgroundColor: "white" }}>
        <div className="loginSection">
          <div className="loginTextDiv">
            <p className="LoginText">
              Login here as a newly registered customer or a new customer. Your
              credentials are highly secured and if you desire, you can chose
              multiplevel authentication.
            </p>
          </div>
          <div className="loginInput">
            <h3 className="loginText">Login Here</h3>
            <form noValidate autoComplete="off">
              <div className="firstInput">
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={this.state.form.login.email.value}
                  onChange={value => this.updateInput(value, "email", "login")}
                  disabled={this.state.form.register.name.value !== ""}
                />
              </div>
              <div>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={this.state.form.login.password.value}
                  onChange={value =>
                    this.updateInput(value, "password", "login")
                  }
                  disabled={this.state.form.register.name.value !== ""}
                  fullWidth
                />
              </div>
              <div className="submitButton">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.submitUserInfo("Login")}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="registerSection">
          <div className="registerInput">
            <h3 className="loginText">Create New Account</h3>
            <form noValidate autoComplete="off">
              <div className="firstInput">
                <TextField
                  name="name"
                  //id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  //type={this.state.form.name.type}
                  value={this.state.form.register.name.value}
                  onChange={value =>
                    this.updateInput(value, "name", "register")
                  }
                  fullWidth
                  disabled={this.state.form.login.email.value !== ""}
                />
              </div>
              <div>
                <TextField
                  name="email"
                  //id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  // type={this.state.form.email.type}
                  value={this.state.form.register.email.value}
                  onChange={value =>
                    this.updateInput(value, "email", "register")
                  }
                  fullWidth
                  disabled={this.state.form.login.email.value !== ""}
                />
              </div>
              <div className="lastInput">
                <TextField
                  name="password"
                  //id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={this.state.form.register.password.value}
                  onChange={value =>
                    this.updateInput(value, "password", "register")
                  }
                  fullWidth
                  disabled={this.state.form.login.password.value !== ""}
                />
              </div>
              <div className="lastInput">
                <TextField
                  name="confirmPassword"
                  //id="outlined-basic"
                  label="ConfirmPassword"
                  variant="outlined"
                  type="password"
                  value={this.state.form.register.confirmPassword.value}
                  onChange={value =>
                    this.updateInput(value, "confirmPassword", "register")
                  }
                  fullWidth
                  disabled={this.state.form.login.email.value !== ""}
                />
              </div>

              <div className="submitButton">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.submitUserInfo("Register")}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
          <div className="registerTextDiv">
            <h2 className="loginText">Terms and Services</h2>
            <p className="LoginText">
              Upon registering we invite you to review our terms and services
              involving data protection and use according to the EU regulations.
              We guarantee utmost privacy and non-disclosure of user
              information.{" "}
            </p>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn, signUp, autoSignIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
