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
    chai.request(app).patch('/users/1')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
});
