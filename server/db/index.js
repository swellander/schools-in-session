const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/schools_test', { logging: false });

const School = db.define('school', {
  name: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.TEXT,
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

const Student = db.define('student', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
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
  gpa: {
    type: Sequelize.FLOAT,
    get(gpa) {
      let strNum = String(this.getDataValue(gpa))
      if (strNum.length === 1) strNum += '.0';
      return strNum;
    }
  },
  //QUESTION: Should this be a BLOB instead of a TEXT?
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg'
  },
  userName: {
    type: Sequelize.STRING,
    defaultValue: 'john'
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: 'dunn'
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