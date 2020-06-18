
import Container, { Service, Inject } from "typedi"
import Post from "../models/post"
import { PostPageDto, PostDto, PostWriteDto, PostWriteCommentDto } from "../models/dto/PostDto"
import DtoFactory from "../models/dto/DtoFactory"
import Tag from "../models/tag"
import { Sequelize, Transaction } from "sequelize/types"
import Comment from "../models/comment"

const sequelize : Sequelize = Container.get("sequalize")

@Service()
export default class PostService{

    async getPosts(postPageDto: PostPageDto) : Promise<PostDto[]> {
        try{
            const { limit, offset } = postPageDto
            const result: Post[] = await Post.findAll({ limit, offset })
            return result.map(v=>DtoFactory.create(PostDto, v))
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

    async writePost(postWriteDto : PostWriteDto) : Promise<Boolean>{
        try{
            const result = await sequelize.transaction( async (t:Transaction)=>{
                const { authorId, title, content, tags } = postWriteDto
                const insertedPost = await Post.create({authorId, title, content}, {transaction:t})
                if(tags && tags.length>0){
                    await Tag.bulkCreate(tags.map(v=>({
                        postId: insertedPost.id,
                        tagName: v
                    })), { transaction: t })
                }
                return true
            })
            return result
        } catch(e) {
            throw e
        }
    }

    async writeComment(postWriteCommentDto: PostWriteCommentDto){
        try{
            return await sequelize.transaction( async (t: Transaction)=> {
                const {authorId, content} = postWriteCommentDto
                await Comment.create({authorId, content})
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