import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace } from 'mobx'
import { SigninDto, SignupDto } from '../models/auth/dto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';

@Autobind
class AuthStore{
    rootStore : RootStore
    @observable token = ""
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @computed
    get isSignin(){
        trace(true)
        return !!this.token
    }

    @action
    async signin(signinDto: SigninDto){
        const error = await validate(signinDto)
        if(error.length){
            console.log(error[0])
            return;
        }
        
        try{
            const digest = cryptoJs.SHA256(signinDto.password);
            signinDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signin(signinDto);
            console.log(res.data)
            console.log(jwt.decode(res.data.token));
            this.token = res.data.token
        } catch(e) {
            console.log(e.response)
        }

    }
    @action
    async signup(signupDto: SignupDto){
        console.log(signupDto)
        const error = await validate(signupDto)
        if(error.length){
            console.log(error[0])
            return;
        }
        console.log(signupDto)
        try{
            const digest = cryptoJs.SHA256(signupDto.password);
            signupDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signup(signupDto)
            console.log(res.data)
            console.log(jwt.decode(res.data.token));
        } catch(e) {
            console.log(e.response)
        }
    }

}

export default AuthStore