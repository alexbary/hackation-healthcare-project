
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var connectString = ''; // Type your database information here
const MongoClient = require('mongodb').MongoClient;

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

var db
MongoClient.connect(connectString, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8080, () => {
    console.log('listening on 8080');
  })
});

app.get('/find/:firstname/:lastname', function(req, res) {  
  findDoctor(req.params.firstname,req.params.lastname,res);
});

app.get('/review/:firstname/:lastname', function(req, res) {  
	console.log(req.params.firstname);
	console.log(req.params.lastname);
	console.log(req.query.text);
	console.log(req.query.sentiment);
	insertComment(req.params.firstname,req.params.lastname,req.query.text,parseFloat(req.query.sentiment),res);
});

function findDoctor(fname,lname,res) {
	db.collection("doctors").findOne({firstName:fname,lastName:lname},function (err, result) {
    if (err) throw err;

    console.log(result);

	if(result != null && result != undefined){
		res.send(result);
	} else {
		console.log("adding new doctor");
		insertDoctor(fname,lname,res);
	}
  });
}

function insertDoctor(fname,lname,res){
	var doctor = createDoctor(fname,lname);

	console.log("adding new doctor");
	db.collection("doctors").insertOne(doctor, function(err, result) {
	    if (err) throw err;
	    console.log("new doctor added");
	    res.send(doctor);
	});
}

function createDoctor(fname,lname) {
	var doctor = new Object();
	doctor.firstName = fname;
	doctor.lastName = lname;
	doctor.reviews = [];
	return doctor;

	//db.collection('doctors').insert(doctor);
}

function insertComment(fname,lname,text,sentiment,res) {
	var review = createReview(text,sentiment);
	var myquery = {firstName:fname,lastName:lname};
	var newvalues = {$push: {"reviews": review}};
	console.log("1 document updated");
  	db.collection("doctors").updateOne(myquery, newvalues, function(err, result) {
	    if (err) throw err;
	    console.log("1 document updated");
	    res.send({text:"document updated"});
	});
}

function createReview(text,sentimentRaw) {
	var rating = new Object();
	rating.text = text;
	rating.sentimentRaw = sentimentRaw;
	return rating;
}
