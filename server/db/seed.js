const axios = require('axios');
const { db } = require('./index');
const { School, Student } = require('./index').models;

//helper functions
const generateRandomGPA = () => {
  const gpa = (Math.random() * 4).toFixed(1);
  if (gpa.length == 1) gpa += '.0';
  return Number(gpa);
}
const generateRandomSchoolId = () => Math.ceil(Math.random() * schools.length);

const syncSeed = async (schools, students) => {
  try {
    await db.sync({ force: true })
    const [washington, mvhs, laventure] = await Promise.all(schools.map(school => (
      School.create(school)
    )));
    await Promise.all(students.map(student => (
      Student.create(student)
    )));
  } catch (err) {
    throw err;
  }
}

const schools = [
  {
    name: 'Washington',
    address: '1020 McLean Rd.',
    description: `Washington Elementary School was first built in 1905 as a two-story wood frame building housing grades 1-8. The first section of the current building was constructed in 1950, with additions in 1953 and 1960. A total modernization and addition happened in 1983, with a further remodel in 1996. The school is located in West Mount Vernon, close to the Skagit River and to beautiful farmland filled with tulips and other crops unique to our valley.

    Washington is a school community focused on learning and working together with the support of our children's families. We invite you to become a part of our school—by joining our active Parent Group, attending your child's conferences, volunteering in classrooms, participating in field trips, or helping with our many school activities.
    
    Students have the opportunity to participate in a variety of activities including: Band, Orchestra, Student Council, Lego Robotics & other extra-curricular activities.  Continue to check our Website for updated information on the activities that are available.`
  },
  {
    name: 'MVHS',
    address: '314 N. 9th Street',
    description: `The Mount Vernon School District is located 60 miles north of Seattle in the fertile Skagit Valley. We are a growing and diverse school district that employs nearly 900 people serving 6,200+ students in grades kindergarten-12. We have Six elementary schools (grades K-5), two middle schools (grades 6-8), one high school (grades 9-12), and one home school parent partnership (grades K-12).`
  },
  {
    name: 'LaVenture',
    address: '1200 N. LaVenture Road',
    description: `I want to welcome you to the Lincoln Lynx Elementary School website. We are a school community that takes great pride in our students, staff, families and community partnerships. At Lincoln we work very hard to prepare our students for the challenges they will encounter as they grow in the Mount Vernon School District. We provide a well-rounded educational experience that is grounded in reading, writing and math, but also explores other disciplines. We hope that you will stop by for a visit, bring us your children, or join our team as a volunteer.`
  }
];

let students;

axios.get('https://randomuser.me/api/?results=100&inc=name')
  .then(response => response.data.results)
  .then(users => {
    students = users.map(user => (
      {
        firstName: user.name.first,
        lastName: user.name.last,
        gpa: generateRandomGPA(),
        schoolId: generateRandomSchoolId(),
        imageUrl: "https://api.adorable.io/avatars/149/" + user.name.last + ".png"
      }
    ));

    //sync db with successfully grabbed data
    syncSeed(schools, students);
  })
  .then(() => console.log("DB has been seeded."))
  .catch(err => console.log(err))



