const DiscordStrategy = require('passport-discord').Strategy;
const scopes = ['idenfity', 'email'];

const passportDiscordStrategy = new DiscordStrategy({
    clientID: process.env.DISCORD_OAUTH_CLIENT_ID_LOCAL,
    clientSecret: process.env.DISCORD_OAUTH_SECRET_LOCAL,
    callbackURL: "http://localhost:3000/auth/discord/callback",
    scope: scopes
},
    function(accessToken, refressToken, profile, cb) {
        // from example
        // User.findOrCreate({ discordId: porfile.id }, function(err, user) {
        //     return cb(err, user);
        // })
    });

export default passportDiscordStrategy