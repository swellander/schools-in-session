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
  firstName: {
    type: Sequelize.STRING,
    get() {
      let name = this.getDataValue('firstName')
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    defualtValue: 'nick'
  },
  lastName: {
    type: Sequelize.STRING,
    get() {
      let name = this.getDataValue('lastName')
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    defualtValue: 'cage'
  },
  gpa: Sequelize.FLOAT,
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg'
  }
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