const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
// app.use(morgan());
app.use('/api', require('./api'));
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.use((err, req, res, next) => {
  if (err.status == 401) res.sendStatus(401);
  else res.send(err);
})

module.exports = app;
