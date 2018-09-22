const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);
const { students, schools } = require('./seed');

const School = db.define('school', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  }
});

const Student = db.define('student', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  gpa: Sequelize.FLOAT
});

//ASSOCIATIONS
Student.belongsTo(School);
School.hasMany(Student);

const syncSeed = async () => {
  await db.sync({ force: true })
  const [washington, mvhs, laventure] = await Promise.all(schools.map(school => (
    School.create(school)
  )));
  const [john, jj, madeline] = await Promise.all(students.map(student => (
    Student.create(student)
  )));
  await john.setSchool(laventure);
  await jj.setSchool(washington);
  await madeline.setSchool(mvhs);
}

module.exports = {
  syncSeed,
  models: {
    School,
    Student
  }
}