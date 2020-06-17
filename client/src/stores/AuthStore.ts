import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { SigninDto, SignupDto, User } from '../models/AuthDto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'

@Autobind
class AuthStore{
    rootStore : RootStore
    @observable token = ""
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
        autorun(()=>{
            console.log("autorun:"+this.token)
            AuthRepository.token = this.token
            PostRepositoty.token = this.token
        })
    }

    @computed
    get isSignin(){
        return !!this.token
    }
    @computed
    get user(){
        return jwt.decode(this.token) as User || null
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
            this.token = res.data.token
            console.log(this.token)
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