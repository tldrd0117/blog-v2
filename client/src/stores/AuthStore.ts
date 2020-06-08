import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action } from 'mobx'
import { SignInDto, SignUpDto } from '../models/auth/dto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'

@Autobind
class AuthStore{
    rootStore : RootStore
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }
    @action
    async signIn(signInDto: SignInDto){
        const error = await validate(signInDto)
        if(error.length){
            console.log(error[0])
            return;
        }
        try{
            const res : AxiosResponse = await AuthRepository.sigIn(signInDto);
            console.log(res.data)
        } catch(e) {
            console.log(e.response)
        }

    }
    @action
    signUp(signUpDto: SignUpDto){
        AuthRepository.signUp(signUpDto)

    }
}

export default AuthStore