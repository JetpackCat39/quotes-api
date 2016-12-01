var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://heroku_hwn3xb29:d2l1apo2soe77k7ekhs46r94rn@ds159507.mlab.com:59507/heroku_hwn3xb29';

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        res.send("Connected successfully to server");

        db.close();
    });
});

module.exports = router;