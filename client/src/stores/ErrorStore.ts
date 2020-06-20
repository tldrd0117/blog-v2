import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { PostPageDto, PostWriteDto, PostWriteCommentDto } from '../models/PostDto'
import { Dto } from '../models/index'
import AuthRepository from '../repository/AuthRepository'
import { validate, ValidationError } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'

@Autobind
class ErrorStore{
    rootStore : RootStore
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    async validateError(dto: Dto){
        const error = await validate(dto)
        if(error.length){
            throw error
        }
        return true
    }

    @action
    async handleValidateError(e: any){
        if(e instanceof Array){
            if(e.every(v=>v instanceof ValidationError)){
                console.log("validateError:" + e);
            }
        }
    }

    @action
    async hadnleAxiosError(e: any){
        if(e.response){
            console.log("axiosError:" + e);
        }
    }

}

export default ErrorStore