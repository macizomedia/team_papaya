let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).name
    : "";
let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).password
    : "";
let avatar = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).avatar
    : "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff";
let dreamList = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).list
    : "countryList";
export const initialState = {
    user: "" || user,
    token: "" || token,
    avatar: "" || avatar,
    dreamList: "" || dreamList,
    loading: false,
    errorMessage: null,
};

export const CountryReducer = (initialState, action) => {
    console.log(JSON.stringify(action.payload, null, 4));
    switch (action.type) {
        case "LIKE":
            return {
                ...initialState,
                dreamList: action.payload.country,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthReducer = (initialState, action) => {
<<<<<<< HEAD
  console.log("from reducer func" + JSON.stringify(action.payload, null, 4) );
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
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };
=======
    console.log("from reducer func " + JSON.stringify(action.payload, null, 4));
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
                loading: false,
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: "",
            };
>>>>>>> f8ba4d6651217e8ac984dc293e162fe5e1de5046

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
