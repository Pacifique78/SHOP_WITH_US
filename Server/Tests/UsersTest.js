import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../index';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe('Desactivate a user', () => {
  it('Should return a success: user desactiated or activated', (done) => {
    chai
      .request(app)
      .patch('/users/3')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
  it('Should return a success: user desactiated or activated', (done) => {
    chai
      .request(app)
      .patch('/users/3')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
});
describe('View paginated results', () => {
  it('Should return few users', (done) => {
    chai
      .request(app)
      .get('/users/page/1')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Users successfully retreived');
        done();
      });
  });
  it('Should return few users', (done) => {
    chai
      .request(app)
      .get('/users/page/2')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Users successfully retreived');
        done();
      });
  });
  it('Should return few orders', (done) => {
    chai
      .request(app)
      .get('/orders/page/1')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Orders successfully retreived');
        done();
      });
  });
  it('Should return few orders', (done) => {
    chai
      .request(app)
      .get('/orders/page/2')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Orders successfully retreived');
        done();
      });
  });
});
describe('Search API', () => {
  it('Should return a success: users successfully retreived', (done) => {
    chai
      .request(app)
      .get('/search/users/dam')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
  it('Should return a success: orders successfully retreived', (done) => {
    chai
      .request(app)
      .get('/search/orders/su')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('array');
        done();
      });
  });
});
