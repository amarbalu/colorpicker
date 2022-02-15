import React from "react";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

import "./css/App.css";
import { Spin } from "antd";
import Login from "./pages/Login";
import Fetch from "./components/Fetch";
import PrivateRoute from "./components/PrivateRoute";

const history = createBrowserHistory();

const Loader = (props) => (
  <div className={props.isshow ? "spinner-back  show spinnerLayout" : "hide"}>
    <Spin
      size="large"
      className={"spinner " + (props.isshow ? "show" : "hide")}
    />
  </div>
);
const App = (propsValue) => {
  const routes = [
    { path: "/loginpage", component: <Login {...propsValue} /> },

    { path: "/registerpage", component: <Register {...propsValue} /> },

    { path: "/dashboard", component: <Homepage {...propsValue} /> },
  ];
  return (
    <React.Fragment>
      <BrowserRouter history={history}>
        <Switch>
          {routes.map((props, index) =>
            props.path === "/dashboard" ? (
              <PrivateRoute
                exact
                key={props.path}
                path={props.path}
                component={() => props.component}
              />
            ) : (
              <Route
                exact
                key={props.path}
                path={props.path}
                component={() => props.component}
              />
            )
          )}

          <Redirect to="/loginpage"></Redirect>
        </Switch>
      </BrowserRouter>

      <Loader isshow={propsValue.loading} />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.loginReducer.loading,
    color: state.loginReducer.color,
    email: state.loginReducer.email,
    username: state.loginReducer.username,
    colorPicker: state.loginReducer.colorPicker,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    color_update: (color) => {
      dispatch({
        type: "COLOR_UPDATE",
        color,
      });
    },
    fetch: (appendUrl, type, payload, success, failure) =>
      dispatch(Fetch(appendUrl, type, payload, success, failure)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
