import { prisma }  from "../lib/prisma.js"

export class PostService {
    async create(){
        
    }

    async findAll(){
        return await prisma.post.findMany({
        orderBy: {id: "asc" },
    })
}

async findById(id: number){
    return await prisma.post.findUnique({
        where: {id},
    })
}

async findByAuthor(id: number) {
    return await prisma.post.findMany({})
}