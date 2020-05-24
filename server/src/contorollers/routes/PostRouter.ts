import { Router, Request, Response } from "express"
import PostService from "../../services/PostService"
import { Container } from 'typedi'

const postRouter = Router()

export default (router: Router) => {
    router.use("/post", postRouter)
    postRouter.get("/all", async function(req: Request, res: Response){
        const postService = Container.get(PostService)
        const result = await postService.getPosts()
        return res.json(result).status(200);
    })
}