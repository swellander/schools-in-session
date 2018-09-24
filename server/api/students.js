const router = require('express').Router();
const { Student, School } = require('../db').models;

router.get('/', (req, res, next) => {
  Student.findAll({
    include: [School]
  })
    .then(students => res.json(students))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
})
module.exports = router;