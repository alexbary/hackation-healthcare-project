var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://nodeRW:ratingDoctors@ds227565.mlab.com:27565/idwapefaprd', function (err, db) {
  if (err) throw err

  db.collection('doctors').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result);
	console.log(result[0].firstName + ' ' + result[0].firstName);
	console.log(result[0].reviews);

	var review0 = createReview("cures cancer on sight",0.56);
	var review1 = createReview("fake ass medicine man",-0.44);
	var mark = createDoctor("Mark", "Schwartz", [review0, review1]);
	//db.collection('doctors').insert(mark);
  })
	
})

function createDoctor(fname,lname,reviews){

	var doctor = new Object();
	doctor.firstName = fname;
	doctor.lastName = lname; //todo
	doctor.reviews = reviews;
	return doctor;

	//db.collection('doctors').insert(doctor);
}


function createReview(text,sentimentRaw){
	var rating = new Object();
	rating.text = text;
	rating.sentimentRaw = sentimentRaw;

	return rating;
}
/*
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  res.send('You sent the name "' + req.body.name + '".');
  console.log(req.body.name);
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});*/