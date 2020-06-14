import axios from './axiosConfig'
// import { SigninDto, SignupDto } from '../models/auth/dto'
class PostRepository{
    BASE_URL='/post'
    token=""
    // signin(signinDto: SigninDto){
    //     return axios.post(`${this.BASE_URL}/signin`, signinDto);
    // }
    // signup(signupDto: SignupDto){
    //     return axios.post(`${this.BASE_URL}/signup`, signupDto);
    // }

}

export default new PostRepository()