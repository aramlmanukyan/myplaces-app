const expect = require('chai')['expect'];
const server = require('../../utils/server.mock');
const UserFactory = require('../../factories/user.factory');

const ENDPOINT = 'http://localhost:9000/v1/user/signup';
let defaultUserPayload = UserFactory.generate();
let savedUser;

describe(`POST ${ENDPOINT}`, () => {
    describe('#201', () => {
    it('return an auth token upon creation', done => {
      server.post(ENDPOINT)
        .send(defaultUserPayload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.token).to.be.defined;
          done();
        });
    });
  });

  // describe('#400', () => {
  //   it('requires unique email and username', done => {
  //     server.post(ENDPOINT)
  //       .send(savedUser.toJSON())
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body.errors).to.be.defined;
  //         expect(res.body.errors.email).to.equal('Email already in use.');
  //         expect(res.body.errors.username).to.equal('Username already taken.');
  //         done();
  //       });
  //   });
  //
  //   it('requires a password', done => {
  //     delete defaultUserPayload.password;
  //     server.post(ENDPOINT)
  //       .send(defaultUserPayload)
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body.errors).to.be.defined;
  //         expect(res.body.errors.password).to.equal('Password is required.');
  //         done();
  //       });
  //   });
  //
  //   it('requires a strong password', done => {
  //     server.post(ENDPOINT)
  //       .send(UserFactory.generate({password: 'short'}))
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body.errors).to.be.defined;
  //         expect(res.body.errors.password).to.equal('Password be at least 6 characters long and contain 1 number.');
  //         done();
  //       });
  //   });
  // });
});
