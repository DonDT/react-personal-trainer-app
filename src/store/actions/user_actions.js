import axios from "axios";
import { SIGN_IN, SIGN_UP, AUTO_SIGN_IN, SIGN_OUT } from "../types";
import { SIGNUP, SIGNIN, FIREBASEURL, REFRESH } from "../../authActions";

export function signUp(data) {
  const request = axios({
    method: "POST",
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGN_UP,
    payload: request
  };
}

export function signIn(data) {
  //console.log(data);
  const request = axios({
    method: "POST",
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGN_IN,
    payload: request
  };
}

export const autoSignIn = refToken => {
  const request = axios({
    method: "POST",
    url: REFRESH,
    data: "grant_type=refresh_token&refresh_token=" + refToken,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: ""
  };
};
