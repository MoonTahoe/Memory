var assert = require('assert');
var request = require('supertest');
var app = require('../app');

describe("Home Page", function() {

    it("should load", function(done) {

        request(app).get('/')
            .expect(200)
            .end(done);

    });

});