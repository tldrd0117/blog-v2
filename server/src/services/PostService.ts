
import Container, { Service, Inject } from "typedi"
import Post from "../models/post"
import { PostPageDto, PostDto, PostWriteDto, PostWriteCommentDto, PostSearchDto, PostGetDto, CommentDto, TagAllDto, PostUpdateDto } from "../models/dto/PostDto"
import DtoFactory from "../models/dto/DtoFactory"
import PostTag from "../models/postTag"
import { Sequelize, Transaction, QueryTypes, Op } from "sequelize"
import Comment from "../models/comment"
import User from "../models/user"
import { UserTokenDto } from "../models/dto/AuthDto"
import AuthService from "./AuthService"
import 'reflect-metadata'
import { stringUtils } from '../utils'
import * as Hangul from 'hangul-js'; 
import { userInfo } from "os"
import Tag from "../models/tag"

@Service()
export default class PostService{

    @Inject()
    authService!: AuthService;

    @Inject("sequelize")
    sequelize!: Sequelize

    async searchPosts(postSearchDto: PostSearchDto){
        let {limit, offset, word, type} = postSearchDto
        await this.updateTagNameViewCount(word)
        const jamoWord = stringUtils.predictJamo(word)
        const searchTargetWords = `"${jamoWord?.join(" OR ")}" IN BOOLEAN MODE`
        const { rows, count } =  await Post.findAndCountAll({
            include: [{
                model: Comment,
                as: 'comments',
                separate:true
            }, {
                model: Tag,
                as: 'tags',
            }, {
                model: User,
                as: 'user',
                attributes: ["username"],
            }],
            where: {
                [Op.or]:[Sequelize.literal(type.map(v=>(
                    v=="title"?`MATCH(Post.title) AGAINST(${searchTargetWords})`:
                    v=="content"?`MATCH(Post.content) AGAINST(${searchTargetWords})`:
                    v=="tag"?`Post.id IN (SELECT postTags.postId FROM tags, postTags WHERE tags.id=postTags.tagId AND MATCH(tags.tagName) AGAINST(${searchTargetWords}))`:null
                )).filter(v=>v).join(" OR "))]
            },
            limit, 
            offset,
            distinct: true,
            subQuery: false,
            order: [["id", "desc"]]
        })
        return {
            count,
            posts:rows.map((v:any)=>{
                console.log(v)
                v.content = stringUtils.removeSymbol(v.content)
                v.content = v.content.slice(0,300)
                v.username = v.user?.username
                v.commentsLength = v.comments.length
                return DtoFactory.create(PostDto, v)
            })
        }
        // return await Post.sequelize?.query(`
        // select posts.*, comments.id as 'comments.id'
        //     , comments.postId as 'comments.postId'
        //     , comments.authorId as 'comments.authorId'
        //     , comments.content as 'comments.content'
        //     , comments.createdAt as 'comments.createdAt'
        //     , comments.updatedAt as 'comments.updatedAt'
        //     , tags.id as 'tags.id'
        //     , tags.postId as 'tags.postId'
        //     , tags.tagName as 'tags.tagName'
        //     , tags.createdAt as 'tags.createdAt'
        //     , tags.updatedAt as 'tags.updatedAt'
        //     , MATCH(posts.title) AGAINST("${word}") as tscore
        //     , MATCH(posts.content) AGAINST("${word}") as cscore
        //     , MATCH(tags.tagName) AGAINST("${word}") as nscore
        // FROM posts
        // LEFT JOIN comments ON posts.id = comments.postId
        // LEFT JOIN tags ON posts.id = tags.postId
        // WHERE
        //     MATCH(posts.title) AGAINST("${word}")
        //     OR MATCH(posts.content) AGAINST("${word}")
        //     OR MATCH(tags.tagName) AGAINST("${word}")
        // ORDER BY (tscore + cscore + nscore) DESC
        // LIMIT ${limit} OFFSET ${offset}
        // `, { type: QueryTypes.SELECT })
        // return await Post.sequelize?.query(`
        //     (select id, title as same, "title" as type, match(title) against("${word}") as score from posts
        //     where match(title) against("${word}"))
        //     union
        //     (select id, title as same, "content" as type, match(content) against("${word}") as score from posts
        //     where match(content) against("${word}"))
        //     union
        //     (select postId as id, tagName as same, "tagName" as type, match(tagName) against("${word}") as score from tags
        //     where match(tagName) against("${word}"))
        //     order by score desc`, { type: QueryTypes.SELECT })
    }

    async updateTagNameViewCount(word: string){
        if(!Hangul.isComplete(word)){
            return;
        }
        await Tag.increment("searchCount", {where: {tagName: word}})
    }

    async getPosts(postPageDto: PostPageDto){
        try{
            const { limit, offset } = postPageDto
            const { rows, count } = await Post.findAndCountAll({ 
                limit, 
                offset,
                distinct: true,
                include: [{
                    model: Comment,
                    as: 'comments',
                    separate:true
                }, {
                    model: Tag,
                    as: 'tags',
                }, {
                    model: User,
                    as: 'user',
                    attributes: ["username"]
                }],
                order: [["id", "desc"]]
            })
            return {
                count,
                posts: rows.map((v:any)=>{
                    const postResult = v.toJSON()
                    postResult.content = stringUtils.removeSymbol(postResult.content)
                    postResult.content = postResult.content.slice(0,300)+(postResult.content.length>300?"...":"")
                    return DtoFactory.create(PostDto, {
                        ...postResult,
                        username: postResult.user.username,
                        commentsLength: postResult?.comments.length,
                        comments: postResult?.comments?.map((v)=>{
                            return DtoFactory.create(CommentDto, {
                                ...v,
                                username: v?.user?.username,
                                comments: v.comments?.map((v)=>{
                                    return DtoFactory.create(CommentDto, {
                                        ...v,
                                        username: v?.user?.username
                                    })
                                })
                            })
                        })
                    })
                })
            }
        } catch(e) {
            throw e
        }
    }

    async getPost(postGetDto: PostGetDto){
        try{
            const {postId} = postGetDto
            const post: any = await Post.findOne({ 
                where: {
                    id: postId
                },
                include: [{
                    model: Comment,
                    as: 'comments',
                    required: false,
                    where: { parentId: null },
                    include: [{
                        model: Comment,
                        as: "comments",
                        include:[{
                            model: User,
                            as: 'user',
                            attributes: ["username"]
                        }]
                    },{
                        model: User,
                        as: 'user',
                        attributes: ["username"]
                    }]
                }, {
                    model: Tag,
                    as: 'tags'
                }, {
                    model: User,
                    as: 'user',
                    attributes: ["username"]
                }]
            })
            const postResult = post.toJSON()
            console.log(postResult)
            return DtoFactory.create(PostDto, {
                ...postResult,
                username: postResult.user.username,
                commentsLength: postResult?.comments.length,    
                comments: postResult?.comments?.map((v)=>{
                    return DtoFactory.create(CommentDto, {
                        ...v,
                        username: v?.user?.username,
                        comments: v.comments?.map((v)=>{
                            return DtoFactory.create(CommentDto, {
                                ...v,
                                username: v?.user?.username
                            })
                        })
                    })
                })
            })
        } catch(e) {
            throw e
        }
    }

    async getAllTags(tagAllDto: TagAllDto){
        const { limit } = tagAllDto
        const tags = await Tag.findAll({
            limit,
            attributes:{
                include:[
                    [Sequelize.literal("(searchCount + viewCount)"),"count"]
                ]
            },
            order: [
                [Sequelize.literal("count"), "desc"]
            ]
        })
        return tags
    }

    async isPostedUser(id: number, userId: number, transaction?: Transaction): Promise<Post | null>{
        try{
            const result: Post | null = await Post.findOne({
                attributes: ["authorId"],
                where:{
                    id
                },
                include:[{
                    model: Tag,
                    as: 'tags'
                }],
                transaction
            })
            if(result && result.authorId != userId){
                throw new Error("게시자만 수정할 수 있습니다.")
            } else if(!result) {
                throw new Error("이미 삭제된 포스트 입니다.")
            }
            return result;
        } catch(e) {
            throw e
        }
    }

    async updatePost(postUpdateDto : PostUpdateDto, token: string) : Promise<boolean>{
        try{
            const result = await this.sequelize.transaction( async (transaction:Transaction)=>{
                const { postId, title, content, tags } = postUpdateDto
                console.log("writePorst", "token:"+token)
                let userTokenDto = DtoFactory.create(UserTokenDto, { token })
                userTokenDto = this.authService.decodeToken(userTokenDto)
                const post: Post = (await this.isPostedUser(postId, userTokenDto.id, transaction)) as Post
                await this.authService.getUserIfRegisted(userTokenDto.email, transaction)
                await Post.update({
                    title, content,
                }, { where: {id: postUpdateDto.postId}})
                if(post.tags && post.tags.length > 0){
                    await PostTag.destroy({where:{postId}})
                }
                if(postUpdateDto.tags && postUpdateDto.tags.length >0){
                    await this.writeOrUpdateTag(postUpdateDto.postId, postUpdateDto.tags, transaction)
                }
                return true
            })
            return result
        } catch(e) {
            throw e
        }
    }

    async writeOrUpdateTag(postId: number, tags: string[], transaction?: Transaction){
        const tagResults: [Tag, boolean][] = await Promise.all([
            ...tags.map(tagName =>{
                return Tag.findOrCreate({
                    where:{
                        tagName
                    },
                    defaults:{
                        tagName,
                        viewCount: 0,
                        searchCount: 0
                    },
                    transaction
                })
            })
        ])
        await PostTag.bulkCreate(tagResults.map(v=>({postId, tagId: v[0].id})),{
            transaction
        })
    }

    async writePost(postWriteDto : PostWriteDto, token: string) : Promise<boolean>{
        try{
            const result = await this.sequelize.transaction( async (transaction:Transaction)=>{
                const { title, content, tags } = postWriteDto
                console.log("writePorst", "token:"+token)
                let userTokenDto = DtoFactory.create(UserTokenDto, { token })
                userTokenDto = this.authService.decodeToken(userTokenDto)
                const user = await this.authService.getUserIfRegisted(userTokenDto.email, transaction)
                const post = await Post.create({
                    authorId: user.id, 
                    title, 
                    content,
                }, {
                    transaction
                })
                if(tags && tags.length > 0)
                    await this.writeOrUpdateTag(post.id, tags, transaction)
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
                let userTokenDto = DtoFactory.create(UserTokenDto, { token })
                userTokenDto = this.authService.decodeToken(userTokenDto)
                const user = await this.authService.getUserIfRegisted(userTokenDto.email, transaction)
                await Comment.create({authorId: user.id, ...postWriteCommentDto}, {transaction})
                return true
            })
        } catch(e) {
            throw e
        }
    }

    async updatePostPlusViewNumber(postId: number){
        
        await Post.increment("view", {
            where: {
                id: postId
            },
            silent: true
        })
        return await Tag.increment("viewCount", {
            where:{
                [Op.or]:[Sequelize.literal(`id IN (SELECT tagId from postTags where postId=${postId})`)]
            },
            silent: true
        })
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