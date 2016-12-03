var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://heroku_hwn3xb29:d2l1apo2soe77k7ekhs46r94rn@ds159507.mlab.com:59507/heroku_hwn3xb29';

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);

            var col = db.collection("quotes");

            col.find({}).toArray(function(err, docs) {
                if(err) {
                    console.log("couldn't query collection");
                    console.log(err)
                } else {
                    res.send(docs);
                }

                db.close();
            });
        }
    });
});

module.exports = router;
