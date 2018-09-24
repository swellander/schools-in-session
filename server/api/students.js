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
  Student.create(req.body, {
    include: [School]
  })
    //TODO: /QUESTION: is there a way to do this in one fell swoop? 
    //rather than creating the student just to go back and find it again.
    .then(student => (
      Student.findById(student.id, {
        include: [School]
      })
    ))
    .then(student => res.json(student))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(status => {
      if (status == 1) res.sendStatus(202);
      else res.sendStatus(500)
    })
})
module.exports = router;