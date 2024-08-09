const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', () => {
  it('should sign up a new user', (done) => {
    chai.request(app)
      .post('/api/signup')
      .send({ username: 'testuser', password: 'testpass' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User created');
        done();
      });
  });

  // Add more tests for login, logout, etc.
});
