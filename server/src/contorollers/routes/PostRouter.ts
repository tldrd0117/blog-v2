import { Router, Request, Response } from "express"
import PostService from "../../services/PostService"
import { Container } from 'typedi'
import Post from "../../models/post"
import { success, error } from '../factorys/ResponseFactory'

const router = Router()
const postService = Container.get(PostService)

export default (appRouter: Router) => {
    appRouter.use("/post", router)
    router.get("/",async function(req: Request, res: Response){
        const result = {}
        // const result = await postService.getPosts();
        return res.json(success(result)).status(200);
    })
    router.post("/create", async function(req: Request, res: Response){
        const post = Post.build(req.body)
        const result = await postService.createPost(post);
        return res.json(success(result)).status(200);
    })
    router.post("/update", async function(req: Request, res: Response){
        const post = Post.build(req.body)
        const result = await postService.updatePost(post);
        return res.json(success(result)).status(200);
        
    })
    router.post("/delete", async function(req: Request, res: Response){
        const id = req.body.id
        const result = await postService.deletePost(id)
        return res.json(success({count: result})).status(200);

    })
}