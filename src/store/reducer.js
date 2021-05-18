let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).name
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).password
  : "";
let dreamList = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).list
    : "countryList";
export const initialState = {
    user: "" || user,
    token: "" || token,
    avatar: "" || avatar,
    dreamList: [] || dreamList,
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
  console.log("from reducer func " + action.payload);
  switch (action.type) {
    case "REGISTER":
      return {
        user: action.payload.name,
        token: action.payload._id,
        loading: false,
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
