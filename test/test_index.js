'use strict'

const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/', () => {
  it('it should return success GET request', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/sign_in', () => {
  it('it should return success POST request', (done) => {
    chai
      .request(app)
      .post('/sign_in')
      .send({admin: '1234', password: '1234'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/logout', () => {
  it('it should return success POST request', (done) => {
    chai
      .request(app)
      .post('/logout')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/search', () => {
  it('it should return success POST request', (done) => {
    chai
      .request(app)
      .post('/search')
      .send({tabe: '', query: ''})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/type_editor', () => {
  it('it should return success GET request', (done) => {
    chai
      .request(app)
      .get('/type_editor')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('/add_type', () => {
  it('it should return success POST request', (done) => {
    chai
      .request(app)
      .post('/add_type')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
