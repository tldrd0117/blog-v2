
import Container, { Service, Inject } from "typedi"
import Post from "../models/post"
import { PostPageDto, PostDto, PostWriteDto, PostWriteCommentDto, PostSearchDto, PostGetDto, CommentDto } from "../models/dto/PostDto"
import DtoFactory from "../models/dto/DtoFactory"
import Tag from "../models/tag"
import { Sequelize, Transaction, QueryTypes, Op } from "sequelize"
import Comment from "../models/comment"
import User from "../models/user"
import { UserTokenDto } from "../models/dto/AuthDto"
import AuthService from "./AuthService"
import 'reflect-metadata'
import { stringUtils } from '../utils'
import * as Hangul from 'hangul-js'; 
import { userInfo } from "os"

@Service()
export default class PostService{

    @Inject()
    authService!: AuthService;

    @Inject("sequelize")
    sequelize!: Sequelize

    async searchPosts(postSearchDto: PostSearchDto){
        let {limit, offset, word, type} = postSearchDto
        let lastWord = word[word.length -1]
        if(Hangul.isConsonant(lastWord) || Hangul.isComplete(lastWord)){
            const disWord = Hangul.disassemble(lastWord)
            if(disWord.length <4){
                const jamoMap = {"ㄱ":"가","ㄲ":"까","ㄴ":"나","ㄷ":"다","ㄸ":"따","ㄹ":"라","ㅁ":"마","ㅂ":"바","ㅃ":"빠","ㅅ":"사","ㅆ":"싸","ㅇ":"아","ㅈ":"자","ㅉ":"짜","ㅊ":"차","ㅋ":"카","ㅌ":"타","ㅍ":"파","ㅎ":"하"}
                var texts = new Array()
                var targets = new Array()
                if(disWord.length == 1){
                    if(!Hangul.isConsonant(lastWord)) return;
                    targets.push({
                        fixed : word.slice(0, word.length-1),
                        first : jamoMap[lastWord],
                        last : Hangul.assemble([disWord[0],"ㅣ","ㅎ"])
                    })
                }
                if(disWord.length == 2){
                    if(!Hangul.isComplete(lastWord)) return;
                    targets.push({
                        fixed : word.slice(0, word.length-1), 
                        first : lastWord,
                        last : Hangul.assemble([disWord[0],disWord[1],"ㅎ"])
                    })
                }
                if(disWord.length == 3){
                    //닮 => ㄷ ㅏ ㄹ ㅁ
                    //왜 => ㅇ ㅗ ㅐ
                    targets.push({
                        fixed : word.slice(0, word.length-1),
                        first : lastWord,
                        last : Hangul.assemble([disWord[0],disWord[1],disWord[2],"ㅎ"])
                    })
                    
                    targets.push({
                        fixed : word.slice(0, word.length-1) + Hangul.assemble([disWord[0],disWord[1]]),
                        first : jamoMap[disWord[2]],
                        last : Hangul.assemble([disWord[2],"ㅣ", "ㅎ"])
                    })
                }
                console.log(targets)
                for(var j = 0; j < targets.length; ++j){
                    console.log(targets[j].first)
                    for(var i = targets[j].first.charCodeAt(0); i <= targets[j].last.charCodeAt(0); ++i){
                        texts.push(targets[j].fixed + String.fromCharCode(i))
                    }
                }
                word = `'${texts.join(" OR ")}' IN BOOLEAN MODE`            
            }
        } else {
            word = `"${word}"`
        }
        
            
        const { rows, count } =  await Post.findAndCountAll({
            include: [{
                model: Comment,
                as: 'comments',
            }, {
                model: Tag,
                as: 'tags',
                
            }, {
                model: User,
                as: 'user',
                attributes: ["username"]
            }],
            where: {
                [Op.and]:[Sequelize.literal(type.map(v=>(
                    v=="title"?`MATCH(Post.title) AGAINST(${word})`:
                    v=="content"?`MATCH(Post.content) AGAINST(${word})`:
                    `MATCH(tags.tagName) AGAINST(${word})`
                )).filter(v=>v).join(" OR "))]
            },
            limit, 
            offset,
            distinct: true,
            group:["id"],
            subQuery: false,
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

    async getPosts(postPageDto: PostPageDto){
        try{
            const { limit, offset } = postPageDto
            const { rows, count } = await Post.findAndCountAll({ 
                limit, 
                offset,
                distinct: true,
                include: [{
                    model: Comment,
                    as: 'comments'
                    
                }, {
                    model: Tag,
                    as: 'tags'
                }, {
                    model: User,
                    as: 'user',
                    attributes: ["username"]
                }]
            })
            return {
                count,
                posts: rows.map((v:any)=>{
                    v.content = stringUtils.removeSymbol(v.content)
                    v.content = v.content.slice(0,300)+(v.content.length>300?"...":"")
                    v.username = v.user?.username
                    v.commentsLength = v.comments.length
                    return DtoFactory.create(PostDto, v)
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
            postResult.username = postResult?.user?.username
            postResult.comments = postResult?.comments?.map((v)=>{
                v.comments = v.comments?.map((v)=>{
                    v.username = v?.user?.username
                    return DtoFactory.create(CommentDto, v || {} )
                })
                v.username = v?.user?.username
                return DtoFactory.create(CommentDto, v || {} )
            });
            return DtoFactory.create(PostDto, postResult || {} )
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

    async updatePostPlusViewNumber(postId: number){
        return await Post.increment("view", {where: {id: postId}})
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