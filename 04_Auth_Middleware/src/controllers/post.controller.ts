import type {Request, response} from "express"
import {PostService} from "../services/post.service.js

const postServices = new PostService()

export class PostControle{
    async create(req: Request, res: Response) {
        const post = await postServices.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: req.user.id,
            },
        })

        res.status(201),json(post)
    }
}