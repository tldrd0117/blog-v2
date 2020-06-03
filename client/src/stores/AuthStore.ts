import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action } from 'mobx'
import { SignInDto, SignUpDto } from '../models/auth/dto'

@Autobind
class AuthStore{
    rootStore : RootStore
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }
    @action
    signIn(signInDto: SignInDto){
        console.log(signInDto);
    }
    @action
    signUp(signUpDto: SignUpDto){

    }
}

export default AuthStore