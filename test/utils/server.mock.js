const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app/www/server.js');

chai.use(chaiHttp);
module.exports = chai.request(server);