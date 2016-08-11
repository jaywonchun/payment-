var express = require('express'); 
var mongoose = require('mongoose');
var User = require('./models/users');

var app = express();

app.listen(8081, function(){
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
})

app.use(express.static(__dirname + './../app'));

var auth_routes = require('./routes/auth');


mongoose.connect('mongodb://localhost/data/db/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});


var user1 = User(
    {
        name: "Quantum",
        email: "460 King St. West",
        password: "fssf"
    }
);

user1.save(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('User created!');
    }
});