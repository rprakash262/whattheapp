const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
var http = require('http');
const socket = require('socket.io');

options={
  cors:true,
  origins:["http://localhost:5000"],
}

const app = express();

const api = require('./routes/api');

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error while connecting to database', err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// use routes
app.use('/', api);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const server = http.Server(app);
// var io = socket(server, options);
// io.listen(server);

// let interval;

// io.on('connection', (socket) => {
// 	console.log('A user connected');

// 	if (interval) {
// 	    clearInterval(interval);
//   	}

// 	interval = setInterval(() => getApiAndEmit(socket), 5000);

// 	socket.on("disconnect", () => {
// 	    console.log("Client disconnected");
// 	    clearInterval(interval);
// 	});
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));