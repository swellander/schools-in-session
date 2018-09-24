const router = require('express').Router();
const { School, Student } = require('../db').models;

router.get('/', (req, res, next) => {
  School.findAll({
    include: [Student]
  })
    .then(schools => res.json(schools))
    .catch(next);
});

router.post('/', (req, res, next) => {
  //TODO: /QUESTION: is there a way to do this in one fell swoop? 
  //rather than creating the student just to go back and find it again.
  School.create(req.body)
    .then(school => (
      School.findById(school.id, {
        include: [Student]
      })
    ))
    .then(school => res.json(school))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  School.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(status => {
      if (status == 1) res.sendStatus(202);
      else res.sendStatus(500)
    })
    .catch(next)
});

module.exports = router;