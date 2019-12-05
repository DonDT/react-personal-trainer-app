export const FIREBASEURL = `https://personal-trainer-1bb10.firebaseio.com`;
export const API_KEY = `AIzaSyCzUqKQP6K9gM3RASZBLE6O8wGB5uHyWO4`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const setTokens = (values, cb) => {
  // here the data is simply retrived and passed, to the callback of getTokens, which is cb.

  let objectTosave = {
    token: values.token,
    refreshToken: values.refToken,
    //"@expireToken": expiration.toString(), // we can't store numbers, so we convert them to strings
    uid: values.uid
  };

  localStorage.setItem("userData", JSON.stringify(objectTosave));

  cb();
};

export const getTokens = cb => {
  // here the data is simply retrived and passed, to the callback of getTokens, which is cb.
  let retrievedUserData = localStorage.getItem("userData");
  return cb(JSON.parse(retrievedUserData));

  //return JSON.parse(retrievedUserData);
};
