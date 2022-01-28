const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const server = express();
require("dotenv").config();

const port = Number(process.env.PORT) || 8080;

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? "*" : "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
  })
);

server.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "client/build")));

  server.get("/*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
