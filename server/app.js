const express = require('express');
const app = express();

app.use(express.json());
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
