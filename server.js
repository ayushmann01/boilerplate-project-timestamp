// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  let date = null;
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    date = new Date(dateInt);
    // Date regards numbers as unix timestamps, strings are processed differently
    // res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
     date = new Date(dateString);
    }

  if (date.toString() === "Invalid Date") {
     res.json({ error: "Invalid Date" });
  }
  else {
    res.json({
      unix: Math.round(date.getTime()),
      utc: date.toUTCString(),
    });
  }
});

function getUtcTime(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const h = addZero(date.getUTCHours(), 2);
  const m = addZero(date.getUTCMinutes(), 2);
  const s = addZero(date.getUTCSeconds(), 2);

  const utc =
    days[date.getUTCDay()] +
    ", " +
    date.getUTCDate() +
    " " +
    months[date.getUTCMonth()] +
    " " +
    date.getUTCFullYear() +
    " " +
    h +
    ":" +
    m +
    ":" +
    s +
    " GMT";

  return utc;
}

function addZero(x, n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
