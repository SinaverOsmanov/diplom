const config = require("./config/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const server = express();

const port = process.env.PORT || 8080;

server.use(express.static(path.resolve(__dirname, "client/public")));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.CLIENT_URL || config.clientUrl,
    credentials: true,
    allowedHeaders: "Content-Type",
    methods: ["POST", "GET", "PATCH", "DELETE"],
  })
);

server.use("/api", router);

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "/client")));

  server.get("/", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || config.mongoUrl);
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
