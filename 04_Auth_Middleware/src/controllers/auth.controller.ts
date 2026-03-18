import type { Request, Response } from "express"
import { sanitizeEmail } from "../lib/validateInputs.js"
import dotenv from "dotenv"
import { AuthService } from "../services/auth.service.js"

dotenv.config()

const jwtSecret = process.env.JWT_SECRET || "Default#$%Pass"
const authService = new AuthService()

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const email = sanitizeEmail(req.body.email)
      const password = String(req.body.password || "")

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "E-mail e senha são obrigatórios" })
      }

      const dados = await authService.authenticate(jwtSecret, email, password)

      return res.status(200).json(dados)
    } catch (err) {
      const status = err.status || 500
      return res.status(status).json({ error: err.message || "Erro interno" })
    }
  }
}
