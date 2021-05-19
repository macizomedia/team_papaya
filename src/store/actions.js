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

        dispatch({ type: "LOGIN_ERROR", error: userData.errors[0] });
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
    let userData;
    try {
        dispatch({ type: "REQUEST_LOGIN" });
        await axios.post(endpoint + "/login", body, config).then((res) => {
            userData = res.data;
        });
        //let userData = await response.then(res => res.json());
        if (userData) {
            dispatch({ type: "LOGIN_SUCCESS", payload: userData });
            localStorage.setItem("currentUser", JSON.stringify(userData));
            return userData;
        }

        dispatch({ type: "LOGIN_ERROR", error: userData.errors[0] });
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

export async function like(dispatch, payload) {
    dispatch({ type: "LIKE", payload: payload });
    let user = JSON.parse(localStorage.getItem("currentUser"))
    user['list'] = payload
    let updatedUser = user
    console.log(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
}
