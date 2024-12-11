const express = require("express");
const dotenv = require("dotenv").config();
const connectToBb = require("./db/database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");
const cloudinary = require("cloudinary").v2;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "https://hotel-management-ten-self.vercel.app",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

connectToBb();

app.get("/", (req, res) => {
  res.send("everything is working fine");
});

app.use("/user", userRoutes);
app.use("/room", roomRoutes);

module.exports = app;
