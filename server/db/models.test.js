//TODO: rewrite to work with new seed data

// const expect = require('chai').expect;
// const db = require('./index');
// const { Student, School } = db.models;

// describe('models', () => {
//   beforeEach(() => db.syncSeed());

//   it('the db exists', () => {
//     expect(db).to.be.ok;
//   });

//   describe('School model', () => {
//     it('has three schools', () => {
//       return School.findAll()
//         .then(schools => {
//           expect(schools.length).to.equal(3)
//         })
//     });
//     it('has three students', () => {
//       return Student.findAll()
//         .then(students => expect(students.length).to.equal(3))
//     });
//     it('each student belong to a school', () => {
//       return Student.findAll()
//         .then(students => {
//           students.forEach(student => expect(student.schoolId).to.be.ok)
//         })
//     });
//   })
// });