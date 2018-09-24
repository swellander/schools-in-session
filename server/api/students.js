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
  console.log(req.body);
  Student.create(req.body, {
    include: [School]
  })
    //TODO: /QUESTION: is there a way to do this in one fell swoop? 
    //rather than creating the student just to go back and find it again.
    .then(student => {
      return Student.findById(student.id, {
        include: [School]
      })
    })
    .then(student => res.json(student))
    .catch(next);
})
module.exports = router;