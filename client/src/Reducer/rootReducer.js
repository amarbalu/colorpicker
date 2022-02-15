import { combineReducers } from "redux";

const initialState = {
  loading: false,
  username: "",
  color: "#090909",
  email: "",
  loader: false,
  colorPicker: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ACTION":
      return {
        ...state,
        loading: action.loading,
      };

    case "LOGIN_AUTH":
      if (action.mode === "success") {
        return {
          ...state,
          username: action.payload.username,
          color: action.payload.color,
          email: action.payload.email,
        };
      } else {
        return {
          ...state,
          username: "",
          color: "",
          email: "",
        };
      }
    case "LOADER_CARD":
      return {
        ...state,
        loader: action.loader,
      };
    case "COLOR_UPDATE":
      return {
        ...state,
        color: action.color,
      };
    case "SHOW_PICKER":
      return {
        ...state,
        colorPicker: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
