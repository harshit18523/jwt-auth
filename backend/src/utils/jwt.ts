import jwt from "jsonwebtoken";
import logger from "./logger.js";

function generateAccessToken(payload: {}) {
  try {
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "1m" });
    logger.info("access token generated");
    return token;
  } catch (error) {
    logger.error("access token generation failed");
    throw error;
  }
}

function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
  } catch (error) {
    logger.error("access token verification failed");
    throw error;
  }
}

function generateRefreshToken(payload: {}) {
  try {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "6h" });
    logger.info("refresh token generated");
    return token;
  } catch (error) {
    logger.error("refresh token generation failed");
    throw error;
  }
}

function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  } catch (error) {
    logger.error("refresh token verification failed");
    throw error;
  }
}

function generateTokenPair(payload: {}) {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
}

export { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken, generateTokenPair };
