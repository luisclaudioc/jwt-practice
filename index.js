require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

app = express();

const user = {
  username: "luis",
  password: "secret"
}

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  }); 

app.route('/login')
  .post(function (req, res) {
    if (user.username === req.body.username && user.password === req.body.password) {
      res.json({ result: "success", token: jwt.sign({ word: "coding"}, process.env.JWT_SECRET)});
    } else {
      res.json({ result: "fail" });
    }
});

app.route('/secret')
.post(function (req, res) {
  jwt.verify(req.body.token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.json({ result: "invalid token" })
    } else {
      res.json({ result: "success", message: "I love coding!"})
    }
  })
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});