import React from "react";
import { connect } from "react-redux";
import Fetch from "./Fetch";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const Navbarmenu = (props) => {
  const onLogout = () => {
    props.fetch(
      `/logout`,
      "GET",
      null,
      async (response) => {
        if (response.success) {
          props.history.push("/loginpage");
          props.dispatch({
            type: "LOGIN_AUTH",
            mode: "failure",
          });
        }
      },
      (err) => {
        if (err.status === 401) {
          props.history.push("/loginpage");
        }
      }
    );
  };
  return !props.username ? (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px", backgroundColor: props.color }}
    >
      <Menu.Item
        key="signup"
        onClick={() => {
          props.history.push("/registerpage");
        }}
      >
        Signup
      </Menu.Item>

      <Menu.Item
        key="login"
        onClick={() => {
          props.history.push("/loginpage");
        }}
      >
        Login
      </Menu.Item>
    </Menu>
  ) : (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px", backgroundColor: props.color }}
    >
      <Menu.Item
        key="changeyourtheme"
        onClick={() =>
          props.dispatch({
            type: "SHOW_PICKER",
            colorpicker: true,
          })
        }
      >
        Change your theme
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => onLogout()}>
        <Icon type="logout" />
        <span className="nav-text">Logout</span>
      </Menu.Item>
    </Menu>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (appendUrl, type, payload, success, failure) =>
      dispatch(Fetch(appendUrl, type, payload, success, failure)),
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
    color: state.loginReducer.color,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbarmenu));
