const router = require('express').Router();
const jwt = require('jwt-simple');
const { Student } = require('../db').models;

router.post('/', (req, res, next) => {
  //attempt to find a user with the supplied name and password
  const { userName, password } = req.body;
  Student.findOne({
    where: { userName, password }
  })
    //if a user is found, send back a token
    .then(user => {
      if (user) {
        const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
      }
    })
});

router.get('/', (req, res, next) => {
  const token = req.headers.authorization;
  const id = jwt.decode(token, process.env.JWT_SECRET);
  res.json(id);
})

module.exports = router;