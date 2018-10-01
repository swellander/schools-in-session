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
  res.sendStatus(err.status || 500);
})

module.exports = app;
