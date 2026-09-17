import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import authRouter from "./routes/authRoute.js";
import logger from "./utils/logger.js";

const conn = await connect(`${process.env.MONGO_URI}/auth`);
logger.info("Connected to MongoDB", conn.connection.host);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);

app.listen(3000, () => {
    logger.info("Server is running on port 3000");
});
