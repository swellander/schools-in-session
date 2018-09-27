const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/schools_test', { logging: false });

const School = db.define('school', {
  name: {
    type: Sequelize.TEXT,
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
  gpa: Sequelize.FLOAT,
  imageUrl: Sequelize.STRING
});

//ASSOCIATIONS
Student.belongsTo(School);
School.hasMany(Student);


module.exports = {
  db,
  models: {
    School,
    Student
  }
}