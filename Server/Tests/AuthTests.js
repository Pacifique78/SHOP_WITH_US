import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../index';
import testUser from '../MockData/TestUsers';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe('Welcome Home page', () => {
  it('Should return a welcome text', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.message).to.equal('WELCOME TO SHOP_WITH_US');
        done();
      });
  });
  it('Should return an error', (done) => {
    chai
      .request(app)
      .get('/api/v2/ent')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.ownProperty('error');
        expect(res.body.error).to.equal('The route was not found');
        done();
      });
  });
});
describe('User SignUp', () => {
  it('Should allow a user to signup', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
  it('Should NOT allow a user to signup: Invalid data', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should NOT allow a user to signup: Invalid data', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[7])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should NOT allow a user to signup: Invalid data', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[8])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should NOT allow a user to signup: Invalid data', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[9])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should NOT allow a user to signup: user already exist', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send(testUser[0])
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('Phone number verification', () => {
  it('Should not confirm the user: invalid data', (done) => {
    chai
      .request(app)
      .patch('/auth/confirm')
      .set('Authorization', process.env.userToken)
      .send(testUser[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
          ' verifyCode  length must be at least 6 characters long'
        );
        done();
      });
  });
  it('Should not confirm the user', (done) => {
    chai
      .request(app)
      .patch('/auth/confirm')
      .set('Authorization', process.env.userToken)
      .send(testUser[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should not confirm the user: token not provided', (done) => {
    chai
      .request(app)
      .patch('/auth/confirm')
      .set('Authorization', '')
      .send(testUser[3])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should not confirm the user: Forbiden', (done) => {
    chai
      .request(app)
      .patch('/auth/confirm')
      .set('Authorization', process.env.forbidenToken)
      .send(testUser[3])
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should not confirm the user: false token', (done) => {
    chai
      .request(app)
      .patch('/auth/confirm')
      .set('Authorization', process.env.falseToken)
      .send(testUser[3])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('User Signin', () => {
  it('Should allow a user to signin', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send(testUser[4])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('Should NOT allow a user to signin: Email not found or incorrect password', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send(testUser[5])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
          'Invalid email/ password OR phoneNumber not confirmed'
        );
        done();
      });
  });
  it('Should NOT allow a user to signin: Invalid input or missing input', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send(testUser[6])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(' password  is required');
        done();
      });
  });
});
describe('forgot Password', () => {
  it('Should send an email to reset password', (done) => {
    chai
      .request(app)
      .post('/auth/forgot-password')
      .send(testUser[10])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Email sent, Please check your inbox'
        );
        done();
      });
  });
  it("Should not send an email to reset password: user doesn't exist", (done) => {
    chai
      .request(app)
      .post('/auth/forgot-password')
      .send(testUser[11])
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
          "User with helloworld@gmail.com doesn't exist"
        );
        done();
      });
  });
  it('Should not send an email to reset password: Invalid input or missing input', (done) => {
    chai
      .request(app)
      .post('/auth/forgot-password')
      .send(testUser[12])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('email is not valid');
        done();
      });
  });
});
describe('reset Password', () => {
  it('Should allow a user to reset password', (done) => {
    chai
      .request(app)
      .post('/auth/reset-password')
      .send(testUser[13])
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password reset successfully');
        done();
      });
  });
  it('Should NOT allow a user to reset password: Invalid input or missing input', (done) => {
    chai
      .request(app)
      .post('/auth/reset-password')
      .send(testUser[14])
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
          'password: 1Capital, 1Small, 1Number, 1Character'
        );
        done();
      });
  });
  it('Should NOT allow a user to reset password: Invalid input or missing input', (done) => {
    chai
      .request(app)
      .post('/auth/reset-password')
      .send(testUser[15])
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal("Passwords don't match");
        done();
      });
  });
});
describe('Reset password render html', () => {
  it('Should allow a user to reset password', (done) => {
    chai
      .request(app)
      .get(`/auth/forgot-password/${process.env.adminToken}`)
      .end((err, res) => {
        expect(res).to.have.property('text');
        done();
      });
  });
});
describe('Resend verification code', () => {
  it('Should resend verification code to the user', (done) => {
    chai
      .request(app)
      .get('/auth/resend')
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Verification Code successfully resent'
        );
        done();
      });
  });
});
