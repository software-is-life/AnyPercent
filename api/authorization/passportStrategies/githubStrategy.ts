const GitHubStrategy = require('passport-github2').Strategy;

const githubStrategy = new GitHubStrategy({
        clientID: process.env.GITHUB_OAUTH_CLIENT_ID_LOCAL,
        clientSecret: process.env.GITHUB_OAUTH_SECRET_LOCAL,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // Example in docs. PG query will be different most likely
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
);

export default githubStrategy;