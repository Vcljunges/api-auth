import type { Request, Response } from "express"
import { UserService } from "../services/user.service.js"
import {
  basicValidationRegister,
  sanitizeEmail,
} from "../lib/validateInputs.js"

const userService = new UserService()

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll()
      return res.json(users)
    } catch (err: any) {
      // Adicionado fallback para status 500 caso err.status não exista
      return res.status(err.status || 500).json({ error: err.message || "Erro interno ao buscar utilizadores" })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const user = await userService.findById(id)

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
      }
      return res.json(user)
    } catch (err: any) {
      console.log(err)
      // Descomentado e corrigido para evitar que a requisição fique pendurada
      return res.status(err.status || 500).json({ error: err.message || "Erro interno ao buscar o utilizador" })
    }
  }

  // Criar usuário
  async create(req: Request, res: Response) {
    try {
      // const { name, email, password } = req.body
      const name = req.body.name?.trim() || null
      const email = sanitizeEmail(req.body.email)
      const password = String(req.body.password || "")

      const validationError = basicValidationRegister(email, password)

      if (validationError) {
        return res.status(400).json({ error: validationError })
      }

      const user = await userService.create({ name, email, password })

      res.status(201).json(user)
    } catch (err) {
      res.status(err.status || 400).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { name, password } = req.body

      // Passamos os dados para o serviço (que agora sabe lidar com a encriptação)
      const user = await userService.update(id, { name, password })

      // Remove o campo password do objeto retornado
      const { password: _, ...userWithoutPassword } = user

      return res.json(userWithoutPassword)
    } catch (err: any) {
      console.log(err)
      return res.status(err.status || 500).json({ error: "Erro ao atualizar usuário" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      await userService.delete(id)

      return res.status(204).send()
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Erro ao remover usuários" })
    }
  }
}
