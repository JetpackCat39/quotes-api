var express = require('express');
var router = express.Router();
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://heroku_hwn3xb29:d2l1apo2soe77k7ekhs46r94rn@ds159507.mlab.com:59507/heroku_hwn3xb29';

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var col = db.collection("quotes");

        col.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            res.send(docs);
        });
        
        var input = fs.createReadStream('lines.txt');
        var arr = readLines(input, func);
        
        for(int i = 0; i < arr.length; i ++) {
            res.send(arr[i]);
        }
            
        db.close();
    });
    
    var input = fs.createReadStream('lines.txt');
    readLines(input, func);
    
    
});

module.exports = router;
