
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var connectString = 'mongodb://nodeRW:ratingDoctors@ds227565.mlab.com:27565/idwapefaprd';
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

// app.post('/quotes', (req, res) => {
//   db.collection('quotes').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })


app.get('/find/:firstname/:lastname', function(req, res) 
{  
  findDoctor(req.params.firstname,req.params.lastname,res);
});

app.get('/review/:firstname/:lastname', function(req, res) 
{  
	console.log(req.params.firstname);
	console.log(req.params.lastname);
	console.log(req.query.text);
	console.log(req.query.sentiment);
	insertComment(req.params.firstname,req.params.lastname,req.query.text,parseFloat(req.query.sentiment),res);
});

// MongoClient.connect('mongodb://nodeRW:ratingDoctors@ds227565.mlab.com:27565/idwapefaprd', function (err, db) {
//   if (err) throw err

//   db.collection('doctors').find().toArray(function (err, result) {
//     if (err) throw err


//     console.log(result);
// 	console.log(result[0].firstName + ' ' + result[0].firstName);
// 	console.log(result[0].reviews);

// 	var review0 = createReview("cures cancer on sight",0.56);
// 	var review1 = createReview("fake ass medicine man",-0.44);
// 	var mark = createDoctor("Mark", "Schwartz", [review0, review1]);
// 	//db.collection('doctors').insert(mark);
//   })
	
// })


function findDoctor(fname,lname,res)
{
	db.collection("doctors").findOne({firstName:fname,lastName:lname},function (err, result) {
    if (err) throw err

    console.log(result);

	if(result != null && result != undefined){
		res.send(result);
	}else{
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



function createDoctor(fname,lname){

	var doctor = new Object();
	doctor.firstName = fname;
	doctor.lastName = lname;
	doctor.reviews = [];
	return doctor;

	//db.collection('doctors').insert(doctor);
}

function insertComment(fname,lname,text,sentiment,res){
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

function createReview(text,sentimentRaw){
	var rating = new Object();
	rating.text = text;
	rating.sentimentRaw = sentimentRaw;
	return rating;
}
