import axios from './axiosConfig'
import { PostWriteDto } from '../models/PostDto'
// import { SigninDto, SignupDto } from '../models/auth/dto'
class PostRepository{
    BASE_URL='/post'
    token=""
    writePost(postWriteDto: PostWriteDto){
        return axios.post(`${this.BASE_URL}/signin`, postWriteDto)
    }

}

export default new PostRepository()