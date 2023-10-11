import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }

  try {
    jwt.verify(token, config.TOKEN_KEY as Secret);
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }

  return next();
};

export default verifyToken;
