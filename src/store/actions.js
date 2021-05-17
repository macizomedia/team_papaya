import axios from "axios";

let endpoint = "http://localhost:8080";
const config = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export async function signInUser(dispatch, registerPayload) {

  let body = JSON.stringify(registerPayload);
  let data;
  try {
  dispatch({ type: "REGISTER" });
    await axios.post(endpoint + "/user", body, config).then((res) => {
      data = res.data;
    });

    if (data) {
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function loginUser(dispatch, loginPayload) {
  const config = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  let body = JSON.stringify(loginPayload);
  console.log(body);
  let data;
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    await axios.post(endpoint + "/login", body, config).then((res) => {
      data = res.data;
    });
    //let data = await response.then(res => res.json());
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
