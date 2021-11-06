import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import path from "path";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const server = express();

server.use(express.static(path.resolve(__dirname, "public")));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    allowedHeaders: "Content-Type",
    methods: ["POST", "GET", "PATCH", "DELETE"],
  })
);

server.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    server.listen(config.port, () => {
      console.log(`Example app listening at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
