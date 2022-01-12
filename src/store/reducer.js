let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).name
    : "";
let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).password
    : "";
let avatar = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).avatar
    : "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff";
let list = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).list
    : "";

export const initialState = {
    user: "" || user,
    token: "" || token,
    avatar: "" || avatar,
    list: ""|| list,
    loading: false,
    errorMessage: null,
};

export const CountryReducer = (initialState, action) => {
    console.log("from reducer", JSON.stringify(action.payload, null, 4));
    switch (action.type) {
        case "LIKE":
            return {
                ...initialState,
                list: action.payload
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REGISTER":
            return {
                loading: true,
            };
        case "REGISTER_SUCCESS":
            return {
                user: action.payload.name,
                token: action.payload.password,
                avatar: action.payload.avatar,
                list: action.payload.list,
                loading: true,
            };
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload.name,
                token: action.payload.password,
                avatar: action.payload.avatar,
                list: action.payload.list,
                loading: false,
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: "",
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
