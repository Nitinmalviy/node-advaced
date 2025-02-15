const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require("passport");
const authRoutes = require("./routes/auth.Route");
require("./config/passport.config");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;

// routes here

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log("Database connected");
      console.log(`Server is running on port ${PORT}`);
    })
    .catch((error) => {
      console.error(`Database connection failed: ${error.message}`);
    });
});
