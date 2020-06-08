import axios from 'axios'
import { SignInDto, SignUpDto } from '../models/auth/dto'

if(process.env.NODE_ENV=="development"){
    axios.defaults.baseURL = "http://localhost:8080";
}
class AuthRepository{
    BASE_URL='/auth'
    sigIn(signInDto: SignInDto){
        return axios.post(`${this.BASE_URL}/signin`, signInDto);
    }
    signUp(signUpDto: SignUpDto){
        return axios.post(`${this.BASE_URL}/signin`, signUpDto);
    }

}

export default new AuthRepository()