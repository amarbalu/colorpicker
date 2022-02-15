import Fetch from "./components/Fetch";

function loginAuthentication() {
  return function (dispatch) {
    dispatch(
      Fetch(
        `/login_auth`,
        "GET",
        null,
        (response) =>
          dispatch({
            type: "LOGIN_AUTH",
            payload: response,
            mode: "success",
          }),
        (err) =>
          dispatch({
            type: "LOGIN_AUTH",
            payload: err,
            mode: "failure",
          })
      )
    );
  };
}

function fetchSecretSauce() {
  return Fetch(`/login_auth`, "GET", null, null, null);
}
async function AuthCheck() {
  try {
    await fetchSecretSauce();
    return true;
  } catch (ex) {
    return false;
  }
}
export { AuthCheck, fetchSecretSauce };
export default loginAuthentication;
