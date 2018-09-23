const express = require('express');
const app = express();
const db = require('./db');
const { School, Student } = db.models;
const morgan = require('morgan');

app.use(express.json());
// app.use(morgan());


app.get('/api/schools', (req, res, next) => {
  School.findAll()
    .then(schools => res.json(schools))
    .catch(next);
});

app.post('/api/schools', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next);
})

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
})

app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
})
module.exports = app;
