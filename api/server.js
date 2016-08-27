var express = require('express'); 
var mongoose = require('mongoose');
//var models = require('./models');
var bodyParser = require('body-parser');

var app = express();

/*SOCKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET*/

var http = require('http').Server(app);

//below is connecting the client
var io = require('socket.io')(http);

app.get('/addddd', function(req, res){
  res.sendFile(__dirname + './../app');
});

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
*/
// io.on('connection', function(socket){
//   console.log('a user connected');
// });

//this is to send it to everyone
io.on('connection', function(socket){
    console.log('a user connected');
  socket.on('friendrequest', function(msg){
    console.log('message: ' + msg);

    //broadcast to everyone
     io.emit('friendrequest', msg);

  });
});

//custom namespace, ROOM 
var pal = io.of('/myfriend');
pal.on('connection', function(socket){
  //console.log('someone connected');

  //Within each namespace, you can also define arbitrary channels that sockets can join and leave.
  pal.on('connection', function(socket){
    socket.join('squad');

//youtube tutorial 
    socket.on('friend', function(data) {
        console.log(data.invitor, data.invitee, "whats data")
       // socket.friends = data;
         pal.to('squad').emit('friend', data);
    })


        socket.on('invitation', function(msg){
             console.log('message: ' + msg);
             pal.to('squad').emit('invitation', msg);
              //broadcast to everyone in chat
         });

       
  }); 

});




http.listen(1234, function(){
  console.log('listening on *:1234');
});

/*SOCKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app'));

//listen for server
/*app.listen(8081, function(){
	console.log('Server Started on http://localhost:8081');
	console.log('Press CTRL + C to stop server');
})*/

//middleware
var authorize = require('./middleware/authorize'); 



//routes
var auth_routes = require('./routes/auth');
var user_routes = require('./routes/user'); 
var get_token = require('./routes/stripetoken');
var group = require('./routes/group');

app.use('/api/auth', auth_routes);
app.use('/api/user', authorize, user_routes); 
app.use('/api/token', get_token); 
app.use('/api/group', group);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data/db/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});


/*var user1 = User(
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
});*/

