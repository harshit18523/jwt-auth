import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    }
}

const verifyJwt = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        logger.error("no access token")
        return res.status(401).json({
            error: "Access token required",
        });
    }

    const decodedToken = verifyAccessToken(accessToken) as {
        userId: string;
        email: string;
    };
    req.user = decodedToken;
    next();
});

export default verifyJwt;
