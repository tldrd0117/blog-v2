
import { Service, Inject } from "typedi"
import Post from "../models/post"

@Service()
export default class PostService{

    async getPosts() : Promise<Post[]> {
        const result: Post[] = await Post.findAll()
        return result
    }

    async createPost(post : Post) : Promise<Post[]>{
        const ids = await Post.bulkCreate([post], {
            returning: true
        })
        return ids
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