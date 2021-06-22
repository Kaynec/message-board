const express = require("express");
const router = express.Router();

const dateFns = require("date-fns");
const formatRelative = dateFns.formatRelative;
const subDays = dateFns.subDays;
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: formatRelative(subDays(new Date(), 3), new Date()),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: formatRelative(subDays(new Date(), 3), new Date()),
  },
];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res, next) => {
  res.render("new", { title: "new Form" });
});

router.post("/new", (req, res, next) => {
  if ((req.body.user, req.body.text)) {
    messages.push({
      text: req.body.text,
      user: req.body.user,
      added: formatRelative(subDays(new Date(), 3), new Date()),
    });
    res.redirect("/");
  }
});

// error handler
router.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "404 Page not found" });
});

module.exports = router;
