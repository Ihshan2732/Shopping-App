const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const User = require('../models/User');
const Product = require('../models/Product');

chai.use(chaiHttp);
const { expect } = chai;

describe('Order API', () => {
  let userId, cartItemId, orderId;

  before(async () => {
    const user = new User({ username: 'testuser', password: 'testpass' });
    await user.save();
    //const savedUser = await user.save();
    userId = user._id;

    const product = new Product({ name: 'Test Product', price: 100 });
    //const savedCartItem = await cartItem.save();
    await product.save();

    const cartItem = new CartItem({ userId, productId: product._id, quantity: 1 });
    await cartItem.save();
    //const saveCartItem = await cartItem.save();
    cartItemId = cartItem._id;

    const order = new Order({ userId, items: [cartItemId], total: 100 });
    await order.save();
    // const savedOrder = await order.save();
    orderId = order._id;
  });

  it('should place a new order', (done) => {
    chai.request(app)
    //.get(`/api/orders?userId=${userId}`)
      .post('/api/orders')
      .send({ userId, items: [cartItemId], total: 100 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.total).to.equal(100);
        done();
      });
  });

  it('should fetch orders for a user', (done) => {
    chai.request(app)
      .get(`/api/orders?userId=${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get order details by ID', (done) => {
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.total).to.equal(100);
        done();
      });
  });
});
