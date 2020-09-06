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
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return a success: 2nd order created', (done) => {
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return a success: 3rd order created', (done) => {
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return a success: 4th order created', (done) => {
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return a success: new order created', (done) => {
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken2)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Order created successfully');
        done();
      });
  });
  it('Should return an error: Invalid data', (done) => {
    chai
      .request(app)
      .post('/orders')
      .set('Authorization', process.env.userToken)
      .send(testOrder[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return a success: second order created', (done) => {
    chai
      .request(app)
      .post('/orders')
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
describe('View all orders', () => {
  it('Should return all orders', (done) => {
    chai
      .request(app)
      .get('/orders')
      .set('Authorization', process.env.delivererToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Orders successfully retreived');
        done();
      });
  });
  it('Should not return all orders', (done) => {
    chai
      .request(app)
      .get('/orders')
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('only deliverers can perform this');
        done();
      });
  });
});
describe('Get specific order', () => {
  it('Should not return an order : orderId not found', (done) => {
    chai
      .request(app)
      .get(`/orders/${testOrder[2].orderId}`)
      .set('Authorization', process.env.delivererToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Order not found');
        done();
      });
  });
  it('Should return an order with the specified ID', (done) => {
    chai
      .request(app)
      .get(`/orders/${testOrder[3].orderId}`)
      .set('Authorization', process.env.delivererToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('View my orders', () => {
  it('Should return all orders of mine', (done) => {
    chai
      .request(app)
      .get('/myorders')
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Order(s) successfully retreived');
        done();
      });
  });
  it('Should should not return an order: no order found', (done) => {
    chai
      .request(app)
      .get('/myorders')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
          'There is no orders yet please create some orders'
        );
        done();
      });
  });
});
describe('Update my order', () => {
  it('Should update an order', (done) => {
    chai
      .request(app)
      .patch(`/myorders/${testOrder[3].orderId}`)
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Order successfully updated');
        done();
      });
  });
  it('Should update an order', (done) => {
    chai
      .request(app)
      .patch(`/myorders/${testOrder[3].orderId}`)
      .set('Authorization', process.env.adminToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Order successfully updated');
        done();
      });
  });
});
describe('Delete an order', () => {
  it('Should delete an order', (done) => {
    chai
      .request(app)
      .delete(`/orders/${testOrder[3].orderId}`)
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
  it('Should not delete order: order not found', (done) => {
    chai
      .request(app)
      .delete(`/orders/${testOrder[2].orderId}`)
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Order not found');
        done();
      });
  });
  it('Should not delete order: unauthorized', (done) => {
    chai
      .request(app)
      .delete(`/orders/${testOrder[2].orderId}`)
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('only admins can perform this');
        done();
      });
  });
});
describe('Perform order', () => {
  it('Should give the order price', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[4])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price provided successfully');
        done();
      });
  });
  it('Should give the order price', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[9])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price provided successfully');
        done();
      });
  });
  it('Should give the order price', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[10])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price provided successfully');
        done();
      });
  });
  it('Should give the order price', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[8])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price provided successfully');
        done();
      });
  });
  it('Should give the order price', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[11])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price provided successfully');
        done();
      });
  });
  it('Should not delete order: order not found', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[5])
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Order not found');
        done();
      });
  });
  it('Should not delete order: invalid data', (done) => {
    chai
      .request(app)
      .post('/price_descriptions')
      .set('Authorization', process.env.adminToken)
      .send(testOrder[6])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('Accept price', () => {
  it('Should allow the user to accept the price from a deliverer', (done) => {
    chai
      .request(app)
      .patch(`/orders/${testOrder[3].orderId}`)
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Order accepted');
        done();
      });
  });
  it('Should not allow the user to accept the price from a deliverer: price_description not found', (done) => {
    chai
      .request(app)
      .patch(`/orders/${testOrder[2].orderId}`)
      .set('Authorization', process.env.userToken)
      .send(testOrder[0])
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('Reject an accepted order', () => {
  it('Should allow the admin to reject an accepted  order which have not been performed', (done) => {
    chai
      .request(app)
      .patch(`/rejected/${testOrder[4].orderId}`)
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Order updated');
        done();
      });
  });
  it('Should allow the admin to reject an accepted  order which have not been performed', (done) => {
    chai
      .request(app)
      .patch(`/rejected/${testOrder[3].orderId}`)
      .set('Authorization', process.env.userToken2)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('only admins can perform this');
        done();
      });
  });
});
describe('View paginated results', () => {
  it('Should return few orders', (done) => {
    chai
      .request(app)
      .get('/index/1')
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
      .get('/index/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Orders successfully retreived');
        done();
      });
  });
});
describe('View paginated results', () => {
  it('Should return few price descriptions', (done) => {
    chai
      .request(app)
      .get('/mydescriptions/pages/1')
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(
          'Descriptions successfully retreived'
        );
        done();
      });
  });
  it('Should return few price descriptions', (done) => {
    chai
      .request(app)
      .get('/mydescriptions/pages/2')
      .set('Authorization', process.env.userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(
          'Descriptions successfully retreived'
        );
        done();
      });
  });
});
describe('View orders by prefix', () => {
  it('Should return orders by prefix', (done) => {
    chai
      .request(app)
      .get('/orders/prefix/S')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('Orders successfully retrieved');
        done();
      });
  });
});