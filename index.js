const express = require("express");
const path = require("path");
const register = require("./Routes/Register");
const login = require("./Routes/Login");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csrf = require("csurf");
const { redisClient } = require("./redis");
const redisStore = require("connect-redis")(session);
const upload = multer();
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? { credentials: true }
      : {
          credentials: true,
          origin: "http://localhost:3000",
        }
  )
);
app.use(cookieParser());
app.use(
  session({
    secret: "tHiSiSasEcRetStr",
    name: "_redisPractice",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: process.env.NODE_ENV === "production" ? false : true,
      maxAge: 60 * 60 * 1000,
    },
    store: new redisStore({ client: redisClient, ttl: 3600000 }),
  })
);
app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

const csrfMiddleware = (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  next();
};
app.use(csrfMiddleware);
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send({ err: true, message: "Invalid Csrf Token" });
});
app.use(express.static("client/build"));
const authCheck = (req, res, next) => {
  if (req.user && req.user.id) {
    next();
  } else {
    res.status(401).json({ message: "UnAuthorized" });
  }
};
require("./config/passport")(passport);

app.post(
  "/onLogin",
  upload.none(),
  passport.authenticate("local", {
    failureRedirect: "/login/error",
  }),
  function (req, res) {
    const { user = {} } = req;
    const { color, email, username } = user || {};
    res.send({
      success: true,
      color,
      email,
      username,
      message: "Login success",
    });
  }
);
app.get("/login/error", (req, res) => {
  res.status(401).json({ message: "Failed to Login" });
});
app.get("/error", (req, res) => {
  res.send({ success: false, message: "Invalid Crendentials" });
});

app.get("/login_auth", authCheck, (req, res) => {
  if (req.isAuthenticated()) {
    const { user = {} } = req;
    const { color, email, username } = user || {};
    res.send({
      status: true,
      color,
      email,
      username,
      message: "user autheticated",
    });
  } else {
    res.status(401).send({ status: false, message: "unAuthorised" });
  }
});

app.use("/register", register);
app.use("/login", authCheck, login);
app.get("/logout", (req, res) => {
  req.logOut();
  res.send({ success: true, message: "logged out successfully" });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `client`, `build`, `index.html`));
});
app.listen(port);
