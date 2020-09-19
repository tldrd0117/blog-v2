import axios, {axiosWrapper} from './axiosConfig'
import { PostUpdateDto, PostWriteDto, PostWriteCommentDto, PostPageDto, PostSearchDto, PostGetDto, PostPlusViewNumberDto, TagAllDto, PostDeleteDto } from '../models/PostDto'
import { CancelTokenSource } from 'axios'
// import { SigninDto, SignupDto } from '../models/auth/dto'
class PostRepository{
    BASE_URL='/post'
    beforeCancelToken: CancelTokenSource|undefined

    getPost(postGetDto: PostGetDto){
        return axios.post(`${this.BASE_URL}/`, postGetDto)
    }
    getPosts(postPageDto: PostPageDto){
        return axios.post(`${this.BASE_URL}/list`, postPageDto)
    }
    async searchPost(postSearchDto:PostSearchDto){
        if(this.beforeCancelToken){
            this.beforeCancelToken.cancel("Requested canceled")
        }
        this.beforeCancelToken = axiosWrapper.cancelToken.source()
        const res = await axios.post(`${this.BASE_URL}/search`, postSearchDto, {
            cancelToken: this.beforeCancelToken.token
        })
        if(res) this.beforeCancelToken = undefined
        return res
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
    deletePost(postDeleteDto: PostDeleteDto){
        return axios.post(`${this.BASE_URL}/delete`, postDeleteDto)
    }

}

export default new PostRepository()