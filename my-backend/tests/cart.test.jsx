const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const User = require('../models/User');

chai.use(chaiHttp);
const { expect } = chai;

describe('Cart API', () => {
  let userId, productId, cartItemId;

  before(async () => {
    const user = new User({ username: 'testuser', password: 'testpass' });
    await user.save();
    userId = user._id;

    const product = new Product({ name: 'Test Product', price: 100 });
    await product.save();
    productId = product._id;

    const cartItem = new CartItem({ userId, productId, quantity: 1 });
    await cartItem.save();
    cartItemId = cartItem._id;
  });

  it('should add an item to the cart', (done) => {
    chai.request(app)
      .post('/api/cart')
      .send({ userId, productId, quantity: 2 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.quantity).to.equal(2);
        done();
      });
  });

  it('should get cart items for a user', (done) => {
    chai.request(app)
      .get(`/api/cart?userId=${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a cart item', (done) => {
    chai.request(app)
      .put(`/api/cart/${cartItemId}`)
      .send({ quantity: 3 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.quantity).to.equal(3);
        done();
      });
  });

  it('should remove an item from the cart', (done) => {
    chai.request(app)
      .delete(`/api/cart/${cartItemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Cart item removed');
        done();
      });
  });
});
