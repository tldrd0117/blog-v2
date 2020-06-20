import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { SigninDto, SignupDto, User } from '../models/AuthDto'
import AuthRepository from '../repository/AuthRepository'
import { validate, ValidationError } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'
import ErrorStore from './ErrorStore'

@Autobind
class AuthStore{
    rootStore : RootStore
    errorStore : ErrorStore
    @observable token = ""
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
        this.errorStore = rootStore.errorStore
        autorun(()=>{
            console.log("autorun:"+this.token)
            AuthRepository.setToken(this.token)
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
        try{
            await this.errorStore.validateError(signinDto);
            const digest = cryptoJs.SHA256(signinDto.password);
            signinDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signin(signinDto);
            console.log(res.data)
            this.token = res.data.token
            console.log(this.token)
            return res.data
        } catch(e) {
            if(e instanceof Array){
                console.log(e)
            } else if(e.response){
                console.log(e.response)
            }
        }

    }
    @action
    async signup(signupDto: SignupDto){
        try{
            await this.errorStore.validateError(signupDto);
            const digest = cryptoJs.SHA256(signupDto.password);
            signupDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signup(signupDto)
            return res.data
            console.log(res.data)
            console.log(jwt.decode(res.data.token, {json:true}));
        } catch(e) {
            console.log(e.response)
        }
    }

}

export default AuthStore