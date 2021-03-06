const router = require('express').Router();
const jwt = require('jwt-simple');
const { Student, School } = require('../db').models;

//authentication middleware
router.use((req, res, next) => {
  const token = req.headers.authorization;
  // if request comes in and client is not logged in (no authorization header)
  if (!token) {
    return next(); //why do I need the return statement here?
  }
  //if request comes in with any authorization token (not necessarily valid)
  //decode token and attempt to find user with that id
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id;
  } catch (ex) {
    next({ status: 401 })
  }

  Student.findById(id, {
    include: [School]
  })
    .then(user => {
      //if found, attatch user to req obj
      if (user) req.user = user;
      //if no user found with that id, move on 
      next();
    })
    .catch(next);
});


//login route
router.post('/', (req, res, next) => {
  //attempt to find a user with the supplied name and password
  const { userName, password } = req.body;
  Student.findOne({
    where: { userName }
  })
    //if a user is found, send back a token
    .then(user => {
      if (!user) {
        next({ status: 404 });
      }
      else if (user.password == password) {
        const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        next({ status: 401 })
      }
    })
    .catch(err => {
      next(err);
    });
});
router.get('/', (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next({ status: 401 });
  }
});

module.exports = router;