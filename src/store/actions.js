import axios from "axios";

let endpoint = "http://localhost:8080";
const config = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export async function signInUser(dispatch, registerPayload) {
  let body = JSON.stringify(registerPayload);
  let userData;
  try {
    dispatch({ type: "REGISTER" });
    await axios.post(endpoint + "/user", body, config).then((res) => {
      userData = res.data;
    });

    if (userData) {
      dispatch({ type: "REGISTER_SUCCESS", payload: userData });
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return userData;
    }
    console.log(userData);
    dispatch({ type: "LOGIN_ERROR", error: userData.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function loginUser(dispatch, loginPayload) {
  let body = JSON.stringify(loginPayload);
  let userData;
  let token;
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    await axios.post(endpoint + "/login", body, config).then((res) => {
      token = res.data.token;
      userData = res.data;
    });
    if (userData.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: userData.user });
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("currentUser", JSON.stringify(userData.user));
      return userData;
    }
    if (userData.message) {
      console.log(userData.message);
      dispatch({ type: "LOGIN_ERROR", error: userData.message });
      return;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export async function like(dispatch, payload) {
  /* let body = JSON.stringify(payload)
    let userData;
    try {
        dispatch({type: "SAVE"});
        await axios.post(endpoint + "/user", body, config).then(res => console.log(res.data))
    }catch (err) {
        console.log(err)
    } */
  dispatch({ type: "LIKE", payload: payload });
  let user = JSON.parse(localStorage.getItem("currentUser"));
  user["list"] = payload;
  let updatedUser = user;
  console.log(updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
}
