import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const token = req.headers["authorization"]

//   if (!token) return res.status(403).send("No token provided.")

//   try {
//     next()
//   } catch (err) {
//     res.status(401).send("Invalid token.")
//   }
// }

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const token = req.headers["authorization"]
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) return res.status(403).send("No token provided.")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    console.log(decoded)
    req.user = decoded // Adiciona os dados do usuário à requisição
    next()
  } catch (err) {
    res.status(401).send("Invalid token.")
  }
}
