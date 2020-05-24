
import { Service, Inject } from "typedi"

@Service()
export default class PostService{
    @Inject("Post")
    private post

    async getPosts(){
        const result = await this.post.findAll()
        return result
    }

    async createPost(){
        
    }

}