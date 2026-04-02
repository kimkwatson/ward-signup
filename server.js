console.log(require.resolve("./db/connect"));
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const mongodb = require("./db/connect");
const app = express();
const PORT = process.env.PORT || 3000;

// OAuth require statements
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CALLBACK URL:", process.env.GOOGLE_CALLBACK_URL);
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const users = require("./routes/users");
const sheets = require("./routes/sheets");
const slots = require("./routes/slots");
const claims = require("./routes/claims");
const login = require("./routes/login");
const logout = require("./routes/logout");

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/sheets", sheets);
app.use("/slots", slots);
app.use("/claims", claims);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/auth", login);
app.use("/logout", logout);

// initialize mongodb
const startServer = async () => {
    try {
        await mongodb.initDb();
        console.log('MongoDB connected');

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();

