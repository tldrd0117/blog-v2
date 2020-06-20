import axios, { axiosWrapper } from './axiosConfig'
import { SigninDto, SignupDto } from '../models/AuthDto'
class AuthRepository{
    BASE_URL='/auth'
    setToken(token: string){
        axiosWrapper.token = token
    }
    signin(signinDto: SigninDto){
        return axios.post(`${this.BASE_URL}/signin`, signinDto);
    }
    signup(signupDto: SignupDto){
        return axios.post(`${this.BASE_URL}/signup`, signupDto);
    }

}

export default new AuthRepository()