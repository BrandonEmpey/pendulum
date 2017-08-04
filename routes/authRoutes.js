const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const flash = require("connect-flash");

authRoutes.get("/signup", (req, res) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const { username, password, firstName, lastName, email } = req.body;
  console.log("DEBUG", username, password, firstName, lastName, email);

  if (
    username === "" ||
    password === "" ||
    firstName === "" ||
    lastName === "" ||
    email === ""
  ) {
    next(
      "Please indicate a username, password, first name, last name and email to sign up"
    );
    res.render("auth/signup", {
      errorMessage: "Please fill in the missing information to sign up"
    });
    return;
  }

  authRoutes.post(
    "/signup",
    ensureLoggedOut(),
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup"
    })
  );

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      password: hashPass,
      firstName: firstName,
      lastName: lastName,
      email: email
    });
    console.log("DEBUG", newUser);

    newUser
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch(err => {
        console.log("DEBUG err", err);
        res.render("auth/signup", {
          errorMessage: "Something went wrong with signing up"
        });
      });
  });
});

authRoutes.get("/login", (req, res) => {
  res.render("auth/login");
});

// authRoutes.post("/login", (req, res, next) => {
//   var { username, password } = req.body;
//   // res.render("auth/login");
//
//   if (username === "" || password === "") {
//     res.render("auth/login", {
//       errorMessage: "Indicate a username and a password to log in"
//     });
//     return;
//   }
//
//   User.findOne(
//     { username: username },
//     "_id username password following",
//     (err, user) => {
//       if (err || !user) {
//         res.render("auth/login", {
//           errorMessage: "The username doesn't exist"
//         });
//         return;
//       } else {
//         if (bcrypt.compareSync(password, user.password)) {
//           req.session.currentUser = user;
//           res.redirect("/");
//           // logged in
//         } else {
//           res.render("auth/login", {
//             errorMessage: "Incorrect password"
//           });
//         }
//       }
//     }
//   );
// });

authRoutes.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

authRoutes.get("/private-page", ensureLoggedIn(), (req, res) => {
  res.render("auth/login", { user: req.user });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;
