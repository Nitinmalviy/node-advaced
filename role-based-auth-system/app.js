const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// dotenv configuration
dotenv.config();
const app = express();
// here middleware is used to parse the incoming request body
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth routes

//  http://localhost:5000/api/v1/auth/register
app.use("/api/v1/auth", authRoutes);

// user routes

app.use("/api/v1/users", userRoutes);

// manager routes

// admin routes

// server run on port 3000

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDb()
    .then(() => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    })
    .catch((error) => {
      console.log("Server failed to start", error);
    });
});
