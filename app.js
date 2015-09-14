var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//configure app

app.set('view engine', 'ejs'); //needed for embedded js used in index.ejs
app.set('views', path.join(__dirname, 'views'));//ties view with directory views

//use middleware

app.use(express.static(path.join(__dirname, 'bower_components')));//ties static files in views with bower_components directory

app.use(bodyParser());

//define routes

//  dummy data
var todoItems = [
	{ id: 1, desc: 'foo' },
	{ id: 2, desc: 'bar' },
	{ id: 3, desc: 'baz' }
	];

app.get('/', function(req, res){
	// load data from "DB" here	
	res.render('index', {
		title: 'My App',
		items: todoItems
	});
	console.log('Got a hit!'); //logs all incoming requests to server
});

app.post('/add', function (req, res) {
	var newItem = req.body.newItem;//middleware bodyParser allows for body method
	
	todoItems.push({
		id: todoItems.length + 1,
		desc: newItem
	});
	
	res.redirect('/');

});

app.listen(1337, function(){
	
	console.log('Server running');

	});

