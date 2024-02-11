/* eslint-disable new-cap */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const logger = require("morgan");

require("dotenv").config();

// const indexRouter = require("./routes/index");
// const catalogRouter = require("./routes/catalog");
// const auth = require("./routes/auth");

// app.use("/", indexRouter);
// app.use("/catalog", catalogRouter);
// app.use("/catalog/auth", auth);

const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(limiter);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
// eslint-disable-next-line require-jsdoc
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to MongoDB");
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);