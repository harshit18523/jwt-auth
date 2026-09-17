import crypto from "crypto";
import bcrypt from "bcrypt";
import logger from "./logger.js";

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);
    logger.info("password hashed");
    return hash;
  } catch (error) {
    logger.error("password hashing failed");
    throw error;
  }
}

async function verifyPassword(password: string, hash: string) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    logger.info("password verified");
    return isValid;
  } catch (error) {
    logger.error("password verification failed");
    throw error;
  }
}

function generateRandomPassword(length = 10) {
  const password = crypto.randomBytes(length).toString("base64").slice(0, length);
  logger.info("random password generated");
  return password;
}

export { hashPassword, verifyPassword, generateRandomPassword };
