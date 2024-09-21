/* eslint-disable new-cap */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();
const { main } = require("./mongoConfig");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const app = express();

app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
require("./config/passport")(passport);

// Updated CORS configuration
app.use(
  cors({
    origin: [
      "https://mosmn.me",
      "https://www.mosmn.me",
      "https://admin.mosmn.me",
      /^https:\/\/.*\.mosmn\.me$/,
    ],
    optionsSuccessStatus: 200,
  }),
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter);

main().catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

// Conditionally start the server if the ENVIRONMENT is 'development'
if (process.env.ENVIRONMENT === "development") {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  console.log("Running in a serverless environment, no need for app.listen()");
}

module.exports = app;
