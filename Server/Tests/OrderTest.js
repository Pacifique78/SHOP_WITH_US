import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../index';
import testOrder from '../MockData/TestOrder';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe('Create a new order', () => {
  it('Should return a success: new order created', (done) => {
    chai.request(app).post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return an error: Invalid data', (done) => {
    chai.request(app).post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return a success: second entry created', (done) => {
    chai.request(app).post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
});
