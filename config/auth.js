// config/auth.js
// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1661359497468483', // your App ID
		'clientSecret' 	: 'db8a9d4d2935ffaa28b90043bef387b7', // your App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'k6mH0TLk5VE5UflWqmePkBXdX',
		'consumerSecret' 	: '1KZ5MWfQXkHOmU2LB4kvQSKDU2bB6ah4N5djGRE8ghyyUFyVnO',
		'callbackURL' 		: 'http://127.0.0.1:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '595370832278-1pje7dc8oe2012o42mjkji9ott75ep5o.apps.googleusercontent.com',
		'clientSecret' 	: 'vGAww2iW1eVlxSdcqOVuM-e-',
		'callbackURL' 	: 'http://127.0.0.1:3000/auth/google/callback'
	}

};