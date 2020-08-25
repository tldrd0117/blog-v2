import { Router, Request, Response, NextFunction } from "express"
import PostService from "../../services/PostService"
import { Container } from 'typedi'
import Post from "../../models/post"
import { success, error } from '../factorys/ResponseFactory'
import { isValid, isAuth } from "../middlewares"
import { PostPageDto, PostWriteDto, PostWriteCommentDto, PostSearchDto, PostGetDto, PostPlusViewNumberDto, TagAllDto, PostUpdateDto, PostDeleteDto } from "../../models/dto/PostDto"
import DtoFactory from "../../models/dto/DtoFactory"
import { nextTick } from "process"

const router = Router()

export default (appRouter: Router) => {
    const postService = Container.get(PostService)
    appRouter.use("/post", router)

    router.post("/",
        isValid(PostGetDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const postGetDto = req.body
                const result = await postService.getPost(postGetDto);
                return res.json(success({data:result})).status(200);
            } catch(e) {
                next(e)
            }
        })
    router.post("/list",
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
                return res.json(success({data:result})).status(200);
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
    router.post("/updatePostPlusViewNumber",
        isValid(PostPlusViewNumberDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const postPlusViewNumberDto : PostPlusViewNumberDto = req.body
                const result = await postService.updatePostPlusViewNumber(postPlusViewNumberDto.postId);
                return res.json(success({})).status(200);
            } catch(e) {
                next(e)
            }
        })
    router.post("/getAllTags",
        isValid(TagAllDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const tagAllDto : TagAllDto = req.body
                const result = await postService.getAllTags(tagAllDto);
                return res.json(success({data: result})).status(200);
            } catch(e) {
                next(e)
            }
        })

    router.post("/update", 
        isAuth,
        isValid(PostUpdateDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const post: PostUpdateDto = req.body
                const token = res.locals.token
                const result = await postService.updatePost(post, token);
                return res.json(success({data:result})).status(200);
            } catch(e) {
                next(e)
            }
            
        })
    router.post("/delete", 
        isAuth,
        isValid(PostDeleteDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const post: PostDeleteDto = req.body
                const token = res.locals.token
                const result = await postService.deletePost(post, token);
                return res.json(success({data: result})).status(200);
            } catch(e) {
                next(e)
            }

    })
}