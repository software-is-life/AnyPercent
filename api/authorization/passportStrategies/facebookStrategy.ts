const FacebookStrategy = require('passport-facebook');

const passportFacebookStrategy = new FacebookStrategy({
        clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID_LOCAL,
        clientSecret: process.env.FACEBOOK_OAUTH_SECRET_LOCAL,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(issuer, probile, cb) {
        // TODO: fill in db query code. Determine to use users table
        // TODO: Or create federated_credentials table similar to Passport.js docs.
    });

export default passportFacebookStrategy;