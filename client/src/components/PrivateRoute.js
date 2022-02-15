import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.email ? <Component {...props} /> : <Redirect to="/Login" />
    }
  />
);

const mapStateToProps = (state) => {
  return {
    loading: state.loginReducer.loading,
    email: state.loginReducer.email,
  };
};
export default connect(mapStateToProps, null)(PrivateRoute);
