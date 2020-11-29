// module.exports = {
//   mongoURI: 'mongodb://ravi:ravi123@ds013951.mlab.com:13951/chat',
//   secretOrKey: 'secret',
// };

let keys;

if (process.env.NODE_ENV === 'production') {
	keys = require('./keys_prod');
} else {
	keys = require('./keys_dev')
}

module.exports = keys;