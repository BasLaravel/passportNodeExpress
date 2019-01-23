"use strict";
var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var app = express();
var mongoose = require("mongoose");
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// Passport config file
require('./config/passport')(passport);
var db = "localhost:27017";
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(function () { return console.log("MongoDB connected..."); })
    .catch(function (err) { return console.log(err); });
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
// Bodyparser
app.use(express.urlencoded({ extended: false }));
//Express Session
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flase
app.use(flash());
// Global varibles
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});
//routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
// const data = {
//   happy: true,
//   name: "rabbit",
//   score: "44",
//   exercise: "ts"
// };
// app.get("/kk", function(req, res) {
//   db.insert(data).then(body => {
//     console.log(body);
//     res.send("opgeslagen");
//   });
// });
// app.get("/u", function(req, res) {
//   db.insert(
//     { _rev: "2-abc57701b1b58d1af70618a2bee303c0", data },
//     "39d270915d561980c66b3e14f700d0fb"
//   ).then(body => {
//     console.log(body);
//     res.send("geupdate");
//   });
// });
app.listen(3000, function () {
    console.log("server started on port 3000...");
});
