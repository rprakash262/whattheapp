// module.exports = {
//   mongoURI: 'mongodb://ravi:ravi123@ds013951.mlab.com:13951/chat',
//   mongodb+srv://ravi:<password>@cluster0.alaj6.mongodb.net/chat?retryWrites=true&w=majority
//   secretOrKey: 'secret',
// };

let keys;

if (process.env.NODE_ENV === 'production') {
	keys = require('./keys_prod');
} else {
	keys = require('./keys_dev')
}

module.exports = keys;