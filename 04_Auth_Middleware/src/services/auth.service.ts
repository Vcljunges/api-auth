import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserService } from "./user.service.js"

//npm install jsonwebtoken
//npm install @types/jsonwebtoken -D

const userService = new UserService()

export class AuthService {
  async authenticate(jwtSecret: string, email: string, password: string) {
    const user = await userService.findByEmail(email)

    if (!user) {
      const err = new Error("Credenciais inválidas")
      err.status = 401
      throw err
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      const err = new Error("Credenciais inválidas")
      err.status = 401
      throw err
    }

    //Criar Secret no .env
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, {
      expiresIn: "30s", //"1h", "1d"
    })

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    }
  }
}
