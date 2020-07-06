import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { PostPageDto, PostWriteDto, PostWriteCommentDto, PostSearchDto, PostGetDto } from '../models/PostDto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'
import ErrorStore from './ErrorStore'

@Autobind
class PostStore{
    rootStore : RootStore
    errorStore : ErrorStore

    @observable searchPosts = []
    @observable searchCount = 0
    @observable searchText = ""
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
        this.errorStore = this.rootStore.errorStore
    }

    @action
    async searchPost(postSearchDto:PostSearchDto){
        try{
            await this.errorStore.validateError(postSearchDto)
            const res : AxiosResponse = await PostRepositoty.searchPost(postSearchDto)
            this.searchPosts = res.data.posts
            this.searchCount = res.data.count
            // return res.data
        }catch(e){
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async getPost(postGetDto: PostGetDto){
        try{
            await this.errorStore.validateError(postGetDto)
            const res : AxiosResponse = await PostRepositoty.getPost(postGetDto)
            return res.data.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async getPosts(postPageDto: PostPageDto){
        try{
            await this.errorStore.validateError(postPageDto);
            const res : AxiosResponse = await PostRepositoty.getPosts(postPageDto);
            return res.data.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async writePost(postWriteDto: PostWriteDto){
        try{
            await this.errorStore.validateError(postWriteDto);
            const res : AxiosResponse = await PostRepositoty.writePost(postWriteDto);
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async writeComment(postWriteCommentDto:PostWriteCommentDto){
        try{
            await this.errorStore.validateError(postWriteCommentDto);
            const res : AxiosResponse = await PostRepositoty.writeComment(postWriteCommentDto);
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

}

export default PostStore