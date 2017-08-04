const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login");
const User = require("./models/user");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

//app.use after a router is created

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.static("images"));

app.use(
  session({
    secret: "pendulum",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// NEW
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Signing Up
passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne(
          {
            username: username
          },
          (err, user) => {
            if (err) {
              return next(err);
            }

            if (user) {
              return next(null, false);
            } else {
              // Destructure the body
              const {
                username,
                password,
                firstName,
                lastName,
                email
              } = req.body;
              const hashPass = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(8),
                null
              );
              const newUser = new User({
                username,
                email,
                description,
                password: hashPass
              });

              newUser.save(err => {
                if (err) {
                  next(err);
                }
                return next(null, newUser);
              });
            }
          }
        );
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

// initialize a session
app.use(passport.initialize());
app.use(passport.session());

const index = require("./routes/index");
const authRoutes = require("./routes/authRoutes");

app.use("/", index);
app.use("/", authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
