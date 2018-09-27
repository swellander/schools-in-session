const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./db');

const init = () => {
  // return db.syncSeed()
  //   .then(() => (
  app.listen(port, () => console.log(`Server running on http://localhost:${port}/`))
  // ))
  // .catch(err => console.log(err))
};

init();