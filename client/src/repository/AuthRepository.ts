import axios from 'axios'
import { SignInDto, SignUpDto } from '../models/auth/dto'

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