const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Admin = require('./models/Admin');

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let admin = await Admin.findOne({ googleId: profile.id });
    if (!admin) {
      admin = await Admin.findOne({ email: profile.emails[0].value });
      if (!admin) {
        admin = new Admin({
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        await admin.save();
      } else {
        admin.googleId = profile.id;
        await admin.save();
      }
    }
    done(null, admin);
  } catch (err) {
    done(err);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_REDIRECT_URI,
  profileFields: ['id', 'emails', 'name'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let admin = await Admin.findOne({ facebookId: profile.id });
    if (!admin) {
      admin = await Admin.findOne({ email: profile.emails[0].value });
      if (!admin) {
        admin = new Admin({
          email: profile.emails[0].value,
          facebookId: profile.id,
        });
        await admin.save();
      } else {
        admin.facebookId = profile.id;
        await admin.save();
      }
    }
    done(null, admin);
  } catch (err) {
    done(err);
  }
}));