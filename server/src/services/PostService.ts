
import Container, { Service, Inject } from "typedi"
import Post from "../models/post"
import { PostPageDto, PostDto, PostWriteDto, PostWriteCommentDto } from "../models/dto/PostDto"
import DtoFactory from "../models/dto/DtoFactory"
import Tag from "../models/tag"
import { Sequelize, Transaction, QueryTypes } from "sequelize"
import Comment from "../models/comment"
import User from "../models/user"
import { UserTokenDto } from "../models/dto/AuthDto"
import AuthService from "./AuthService"
import 'reflect-metadata'
import { stringUtils } from '../utils'

@Service()
export default class PostService{

    @Inject()
    authService!: AuthService;

    @Inject("sequelize")
    sequelize!: Sequelize

    async searchPosts(word: string){
        return await Post.sequelize?.query(`
            (select id, title as same, "title" as type, match(title) against("${word}") as score from posts
            where match(title) against("${word}"))
            union
            (select id, title as same, "content" as type, match(content) against("${word}") as score from posts
            where match(content) against("${word}"))
            union
            (select postId as id, tagName as same, "tagName" as type, match(tagName) against("${word}") as score from tags
            where match(tagName) against("${word}"))
            order by score desc`, { type: QueryTypes.SELECT })
    }

    async getPosts(postPageDto: PostPageDto) : Promise<PostDto[]> {
        try{
            const { limit, offset } = postPageDto
            const result: Post[] = await Post.findAll({ 
                limit, 
                offset,
                include: [{
                    model: Comment,
                    as: 'comments'
                }, {
                    model: Tag,
                    as: 'tags'
                }]
            })
            return result.map(v=>{
                v.content = stringUtils.removeSymbol(v.content)
                v.content = v.content.slice(0,300)
                return DtoFactory.create(PostDto, v)
            })
        } catch(e) {
            throw e
        }
    }

    async getPost(postId: number){
        try{
            const post = await Post.findOne({ 
                where: {
                    id: postId
                }
            })
            return DtoFactory.create(PostDto, post || {} )
        } catch(e) {
            throw e
        }
    }

    async writePost(postWriteDto : PostWriteDto, token: string) : Promise<Boolean>{
        try{
            const result = await this.sequelize.transaction( async (transaction:Transaction)=>{
                const { title, content, tags } = postWriteDto
                console.log("writePorst", "token:"+token)
                let userTokenDto = DtoFactory.create(UserTokenDto, { token })
                userTokenDto = this.authService.decodeToken(userTokenDto)
                const user = await this.authService.getUserIfRegisted(userTokenDto.email, transaction)
                const insertedPost = await Post.create({authorId: user.id, title, content}, {transaction})
                if(tags && tags.length>0){
                    await Tag.bulkCreate(tags.map(v=>({
                        postId: insertedPost.id,
                        tagName: v
                    })), { transaction })
                }
                return true
            })
            return result
        } catch(e) {
            throw e
        }
    }

    async writeComment(postWriteCommentDto: PostWriteCommentDto, token: string){
        try{
            return await this.sequelize.transaction( async (transaction: Transaction)=> {
                const { email } = DtoFactory.create(UserTokenDto, { token }).decodeToken();
                const user = await this.authService.getUserIfRegisted(email, transaction)
                const {content} = postWriteCommentDto
                await Comment.create({authorId: user.id, content}, {transaction})
                return true
            })
        } catch(e) {
            throw e
        }
    }

    async updatePost(post : Post){
        const [count, result] = await Post.update({
            ...post
        },{
            where:{
                id: post.id
            }
        })
        return [count, result]
    }

    async deletePost(id : number){
        const count = await Post.destroy({
            where: {
                id: id
            }
        })
        return count
    }
}