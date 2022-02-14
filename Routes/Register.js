const express = require("express");
const app = express.Router();
const formidableMiddleware = require("express-formidable");
const { validateUser } = require("../collections/UserCollection");
const { User } = require("../mongodb");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(formidableMiddleware());

app.post("/onRegister", async (req, res) => {
  let register;
  try {
    await validateUser(req.fields);
  } catch (ex) {
    return res.status(400).send(ex.details[0].message);
  }

  register = await User.findOne({ email: req.fields.email });
  if (register) return res.status(400).send("User already Registered");
  const { username, password, email, confirmPassword, color } = req.fields;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  register = new User({
    username,
    password: hashed,
    email,
    confirmPassword,
    color,
  });

  const result = await register.save();
  return res.send({
    success: true,
    email: result.email,
    message: "User saved successfully.",
  });
});
app.post("/colorUpdate", async function (req, res) {
  const user = await User.findOne({ email: req.fields.email });
  if (user) {
    await User.updateOne(
      { email: req.fields.email },
      {
        $set: {
          color: req.fields.color,
        },
      }
    );

    res.status(200).send({ success: true, message: "Save Updated" });
  }
});
app.post("/deleteRegister", async (req, res) => {
  let register = await Register.findOne({ email: req.fields.email });
  if (register) {
    await Register.deleteOne({ email: register.email });
    return res.send("Record Deleted Successfully");
  } else {
    res.status(400).send("No such record found");
  }
});
module.exports = app;
