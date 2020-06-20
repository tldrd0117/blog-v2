import axios from './axiosConfig'
import { PostWriteDto, PostWriteCommentDto, PostPageDto } from '../models/PostDto'
// import { SigninDto, SignupDto } from '../models/auth/dto'
class PostRepository{
    BASE_URL='/post'

    getPosts(postPageDto: PostPageDto){
        return axios.post(`${this.BASE_URL}/`, postPageDto)
    }
    writePost(postWriteDto : PostWriteDto){
        return axios.post(`${this.BASE_URL}/write`, postWriteDto)
    }
    writeComment(postWriteCommentDto : PostWriteCommentDto){
        return axios.post(`${this.BASE_URL}/writeCommnet`, postWriteCommentDto)
    }

}

export default new PostRepository()