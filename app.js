/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const cors = require('cors');
require("dotenv").config();
const { main } = require("./mongoConfig");
const bodyParser = require('body-parser');


const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const app = express();
// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '16mb' })); // Adjust the limit as needed

// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true })); // Adjust the limit as needed

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
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

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

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);

module.exports = app;
