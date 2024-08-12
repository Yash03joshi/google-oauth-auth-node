require('dotenv').config(); // Add this line at the very top

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connection = require('./config');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const displayName = profile.displayName;
    const givenName = profile.name.givenName;
    const familyName = profile.name.familyName;
    const photo = profile.photos[0].value;
    const dataArray = [email, displayName, givenName, familyName, photo];
    console.log(dataArray);

    connection.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
      if (err) {
        return done(err);
      }
      if (result.length) {
        console.log("Login Successful!");
      } else {
        console.log("Adding user");
        connection.query('INSERT INTO users (email, DisplayName, FirstName, LastName, ProfilePic) VALUES (?, ?, ?, ?, ?)', dataArray, (err, result) => {
          if (err) {
            return done(err);
          }
          console.log("Signup Successful!");
          console.log(result);
        });
      }
      return done(null, profile);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.displayName}!`);
  } else {
    res.redirect('/');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
