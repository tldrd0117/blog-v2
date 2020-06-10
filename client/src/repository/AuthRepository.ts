import axios from 'axios'
import { SigninDto, SignupDto } from '../models/auth/dto'

if(process.env.NODE_ENV=="development"){
    axios.defaults.baseURL = "http://localhost:8080";
}
class AuthRepository{
    BASE_URL='/auth'
    signin(signinDto: SigninDto){
        return axios.post(`${this.BASE_URL}/signin`, signinDto);
    }
    signup(signupDto: SignupDto){
        return axios.post(`${this.BASE_URL}/signup`, signupDto);
    }

}

export default new AuthRepository()