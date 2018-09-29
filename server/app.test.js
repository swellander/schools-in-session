const { expect } = require('chai');
const request = require('supertest');
const app = request(require('./app'));

describe('Integrated api', () => {
  it('exists', () => {
    expect(app).to.be.ok;
  });
  describe('/api/schools', () => {
    it('can get', () => {
      return app.get('/api/schools')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.text).to.contain('Washington');
          expect(response.text).to.contain('MVHS');
          expect(response.text).to.contain('LaVenture');
        })
    })

    it('can post', () => {
      const newSchool = {
        name: 'SVC',
        address: '165 N Collegeway',
        description: 'Pretty cool place to do running start if you are within the MV district'
      }
      return app.post('/api/schools')
        .send(newSchool)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.text).to.contain('SVC')
        })
        .then(() => {
          return app.get('/api/schools')
            .then(response => {
              expect(response.text).to.contain('SVC')
            })
        })
    })
  })

  xdescribe('/api/students', () => {
    it('can get', () => {
      return app.get('/api/students')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.text).to.contain('John');
          expect(response.text).to.contain('J.J.');
          expect(response.text).to.contain('Madeline');
        })
    })

    it('can post', () => {
      const newStudent = {
        firstName: 'Ian',
        lastName: 'Decko',
        gpa: 3.7
      }
      return app.post('/api/students')
        .send(newStudent)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.text).to.contain('Ian')
        })
        .then(() => {
          return app.get('/api/students')
            .then(response => {
              expect(response.text).to.contain('Ian')
            })
        })
    })
  });

  describe('Authentication', () => {
    it('has an auth route', () => (
      app.post('/api/auth')
        .send({ userName: 'john', password: 'dunn' })
        .then(response => {
          const token = response.body.token;
          expect(token).to.be.ok;
          return app.get('/api/auth')
            .set('authorization', token)
            .expect(200);
        })
        .then(response => {
          console.log(response.text)
        })
    ))
  })
})