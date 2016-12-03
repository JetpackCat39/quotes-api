var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://heroku_hwn3xb29:d2l1apo2soe77k7ekhs46r94rn@ds159507.mlab.com:59507/heroku_hwn3xb29';

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var col = db.collection("quotes");

        var arr = col.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            res.send(arr[0]);
        });
            
        db.close();
    });
});

module.exports = router;
