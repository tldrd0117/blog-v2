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
import DtoFactory from '../models/DtoFactory'

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
            signinDto = DtoFactory.create(SigninDto, signinDto)
            await this.errorStore.validateError(signinDto);
            const digest = cryptoJs.SHA256(signinDto.password);
            signinDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signin(signinDto);
            console.log(res.data)
            this.token = res.data.token
            console.log(this.token)
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
            return false;
        }

    }
    @action
    async signup(signupDto: SignupDto){
        try{
            signupDto = DtoFactory.create(SignupDto, signupDto)
            await this.errorStore.validateError(signupDto);
            const digest = cryptoJs.SHA256(signupDto.password);
            signupDto.password = cryptoJs.enc.Base64.stringify(digest)
            const res : AxiosResponse = await AuthRepository.signup(signupDto)
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
            return false;
        }
    }

}

export default AuthStore