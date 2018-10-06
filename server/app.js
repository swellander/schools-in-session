const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('YOOO')
  next();
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
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
