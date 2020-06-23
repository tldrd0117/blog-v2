import { Router, Request, Response, NextFunction } from "express"
import PostService from "../../services/PostService"
import { Container } from 'typedi'
import Post from "../../models/post"
import { success, error } from '../factorys/ResponseFactory'
import { isValid, isAuth } from "../middlewares"
import { PostPageDto, PostWriteDto, PostWriteCommentDto, PostSearchDto } from "../../models/dto/PostDto"
import DtoFactory from "../../models/dto/DtoFactory"

const router = Router()

export default (appRouter: Router) => {
    const postService = Container.get(PostService)
    appRouter.use("/post", router)
    router.post("/",
        isValid(PostPageDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const postPageDto = req.body
                const result = await postService.getPosts(postPageDto);
                return res.json(success({data:result})).status(200);
            } catch(e) {
                next(e)
            }
        })

    router.post("/search", 
        isValid(PostSearchDto),
        async function(req: Request, res: Response, next: NextFunction){
        try{
            const dto: PostSearchDto = req.body
            const result = await postService.searchPosts(dto)
            return res.json(result)
        } catch(e) {
            next(e)
        }
    })
    router.post("/write",
        isAuth,
        isValid(PostWriteDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const postWriteDto = req.body
                const token = res.locals.token
                const result = await postService.writePost(postWriteDto, token);
                return res.json(success({})).status(200);
            } catch(e) {
                next(e)
            }
        })

    router.post("/writeComment",
        isAuth,
        isValid(PostWriteCommentDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const postWriteCommentDto : PostWriteCommentDto = req.body
                const token = res.locals.token
                const result = await postService.writeComment(postWriteCommentDto, token)
                return res.json(success({})).status(200);
            } catch(e) {
                next(e)
            }
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