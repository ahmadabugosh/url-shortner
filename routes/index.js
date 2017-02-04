var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');

var express = require('express');
var router = express.Router();


//connect to database

var mLab = "mongodb://localhost:27017/url-shortner";
var MongoClient = mongodb.MongoClient;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/new/:url(*)', function (req, res, next) {
	
//connect to database
MongoClient.connect(mLab, function (err, db) {
  if (err) {
    console.log("Unable to connect to server", err);
  } else {

  	//connect to server successful
    console.log("Connected to server");
var collection = db.collection('links');
var params = req.params.url;

var newLink = function (db, callback) {

if (validUrl.isUri(params)) {
  // if URL is valid, do this
var shortCode = shortid.generate();
var newUrl = { url: params, short: shortCode };
collection.insert([newUrl]);
res.json({ original_url: params, short_url: "localhost:3000/" + shortCode });

} else {
  // if URL is invalid, do this
res.json({ error: "Wrong url format, make sure you have a valid protocol and real site." });

  
};


};
 
newLink(db, function () {
  db.close();
});
  };
});

});

module.exports = router;
