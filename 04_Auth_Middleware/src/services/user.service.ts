import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
// npm i bcrypt
// npm i @types/bcrypt -D

export class UserService {
  async findAll() {
    return await prisma.user.findMany({
      orderBy: { id: "asc" },
    })
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async create(data: { name: string; email: string; password: string }) {
    const existing = await this.findByEmail(data.email)

    if (existing) {
      const err: any = new Error("E-mail já cadastrado")
      err.status = 409
      throw err
    }

    //Desestrutura o objeto "data", separando a senha dos demais
    const { password, ...anothers } = data
    //Cria a senha criptografada
    const passwordHash = await bcrypt.hash(password, 10)

    //Passa os campos e a senha criptografada
    return await prisma.user.create({
      data: { ...anothers, password: passwordHash },
      //select: { id: true, name: true, email: true, createdAt: true },
    })
  }

  async update(id: number, data: { name?: string; password?: string }) {
    // Cria um objeto para os dados que vão ser atualizados
    const dataToUpdate: any = {}

    if (data.name) {
      dataToUpdate.name = data.name
    }

    // Se a password foi enviada na requisição, fazemos o hash antes de salvar
    if (data.password) {
      dataToUpdate.password = await bcrypt.hash(data.password, 10)
    }

    return await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })
  }

  async delete(id: number) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}