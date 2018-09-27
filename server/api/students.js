const router = require('express').Router();
const { Student, School } = require('../db').models;

router.get('/', (req, res, next) => {
  Student.findAll({
    include: [School]
  })
    .then(students => res.json(students))
    .catch(err => {
      console.log(err);
      next();
    });
})

router.post('/', (req, res, next) => {
  console.log(req.body);
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
    .then(student => {
      console.log(student)
      res.json(student)
    })
    .catch(next);
});
router.put('/', (req, res, next) => {
  //TODO: /QUESTION: is there a way to do this in one fell swoop? 
  //rather than creating the student just to go back and find it again.
  Student.update(req.body, {
    where: {
      id: req.body.id,
    },
    returning: true,
    plain: true,
  })
    .then(arr => arr[1])
    .then(updatedStudent => (
      Student.findById(updatedStudent.id, {
        include: [School]
      })
    ))
    .then(updatedStudent => res.json(updatedStudent))
    .catch(next);
})

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
    .catch(next);
});

module.exports = router;