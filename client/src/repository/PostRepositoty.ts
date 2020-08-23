import axios from './axiosConfig'
import { PostUpdateDto, PostWriteDto, PostWriteCommentDto, PostPageDto, PostSearchDto, PostGetDto, PostPlusViewNumberDto, TagAllDto } from '../models/PostDto'
// import { SigninDto, SignupDto } from '../models/auth/dto'
class PostRepository{
    BASE_URL='/post'

    getPost(postGetDto: PostGetDto){
        return axios.post(`${this.BASE_URL}/`, postGetDto)
    }
    getPosts(postPageDto: PostPageDto){
        return axios.post(`${this.BASE_URL}/list`, postPageDto)
    }
    searchPost(postSearchDto:PostSearchDto){
        return axios.post(`${this.BASE_URL}/search`, postSearchDto)
    }
    writePost(postWriteDto : PostWriteDto){
        return axios.post(`${this.BASE_URL}/write`, postWriteDto)
    }
    writeComment(postWriteCommentDto : PostWriteCommentDto){
        return axios.post(`${this.BASE_URL}/writeComment`, postWriteCommentDto)
    }
    updatePostPlusViewNumber(postPlusViewNumberDto: PostPlusViewNumberDto){
        return axios.post(`${this.BASE_URL}/updatePostPlusViewNumber`, postPlusViewNumberDto)
    }
    getAllTags(tagAllDto : TagAllDto){
        return axios.post(`${this.BASE_URL}/getAllTags`, tagAllDto)
    }
    updatePost(postUpdateDto: PostUpdateDto){
        return axios.post(`${this.BASE_URL}/update`, postUpdateDto)
    }

}

export default new PostRepository()