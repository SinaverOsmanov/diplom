import express from "express";
import roomsRoute from "./rooms.routes";
import authRoute from "./auth.routes";
import auth from "./../middleware/auth.middleware";

// ROUTES
const router = express.Router({ mergeParams: true });

router.use("/auth", authRoute);
router.use("/rooms", auth, roomsRoute);

module.exports = router;
