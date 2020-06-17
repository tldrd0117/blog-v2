import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { PostPageDto, PostWriteDto } from '../models/PostDto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'

@Autobind
class PostStore{
    rootStore : RootStore
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    async writePost(postWriteDto: PostWriteDto){
        console.log(postWriteDto)
        const { authStore } = this.rootStore
        if(authStore.isSignin)
            postWriteDto.authorId = authStore.user.email
        const error = await validate(postWriteDto)
        if(error.length){
            console.log(error[0])
            return;
        }
        console.log(postWriteDto)
        try{
            const res : AxiosResponse = await PostRepositoty.writePost(postWriteDto)
            console.log(res.data)
        } catch(e) {
            console.log(e.response)
        }
    }

}

export default PostStore