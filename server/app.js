const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
// app.use(morgan());
app.use('/api', require('./api'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err);
})

module.exports = app;
