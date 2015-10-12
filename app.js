// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
// Create Express App Object \\

mongoose.connect('mongodb://localhost/Tlosinspace')

var applicantSchema = mongoose.Schema({

	name            : {type: String, required : true},
	bio             : String,
	skills          : Array,
	years 			: Number,
	why   			: String
})

var Applicant = mongoose.model('Applicant', applicantSchema)

var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body)
	var newApplicant = new Applicant(
		req.body
)
	newApplicant.save( function (err, data){
		res.send(data)
	})

});
app.get('/success', function(req, res){
	res.send('Success!!!')

})



// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})