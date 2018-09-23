const router = require('express').Router();
const { School } = require('../db').models;

router.get('/', (req, res, next) => {
  School.findAll()
    .then(schools => res.json(schools))
    .catch(next);
});

router.post('/', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next);
})

module.exports = router;