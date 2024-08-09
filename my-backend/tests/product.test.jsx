const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path if necessary
const Product = require('../models/Product');

chai.use(chaiHttp);
const { expect } = chai;

describe('Product API', () => {
  let productId;

  before(async () => {
    // Optionally, you can add a setup phase to create some initial data
    const product = new Product({ name: 'Test Product', price: 100 });
    await product.save();
    productId = product._id;
  });

  it('should create a new product', (done) => {
    chai.request(app)
      .post('/api/products')
      .send({ name: 'New Product', price: 150 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.equal('New Product');
        done();
      });
  });

  it('should get a list of products', (done) => {
    chai.request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a single product by ID', (done) => {
    chai.request(app)
      .get(`/api/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.equal('Test Product');
        done();
      });
  });

  it('should update a product', (done) => {
    chai.request(app)
      .put(`/api/products/${productId}`)
      .send({ price: 200 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.price).to.equal(200);
        done();
      });
  });

  it('should delete a product', (done) => {
    chai.request(app)
      .delete(`/api/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Product deleted');
        done();
      });
  });
});
