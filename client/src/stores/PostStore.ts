import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { PostPageDto, PostWriteDto, PostWriteCommentDto, PostSearchDto, PostGetDto, PostPlusViewNumberDto, PostDto, TagAllDto, PostUpdateDto } from '../models/PostDto'
import AuthRepository from '../repository/AuthRepository'
import { validate } from 'class-validator'
import { AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';
import PostRepositoty from '../repository/PostRepositoty'
import ErrorStore from './ErrorStore'
import DtoFactory from '../models/DtoFactory'

@Autobind
class PostStore{
    rootStore : RootStore
    errorStore : ErrorStore

    @observable posts = []
    @observable count = 0
    @observable searchText = ""
    @observable searchTypes: string[] = []
    @observable currentPost: any = {}
    @observable tags: any = []
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
        this.errorStore = this.rootStore.errorStore
    }

    @computed
    get isSearch(){
        return this.searchText.length > 0
    }

    @computed 
    get currentPostTags(){
        if(this.currentPost && this.currentPost.tags && this.currentPost.tags.length>0){
            return this.currentPost.tags.map((v:any)=>v.tagName)
        }
        return []
    }

    @action
    async searchPost(postSearchDto:PostSearchDto){
        try{
            postSearchDto = DtoFactory.create(PostSearchDto, postSearchDto)
            await this.errorStore.validateError(postSearchDto)
            const res : AxiosResponse = await PostRepositoty.searchPost(postSearchDto)
            this.searchText = postSearchDto.word
            this.searchTypes = postSearchDto.type
            this.posts = res.data.posts
            this.count = res.data.count
            // return res.data
        }catch(e){
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async getPost(postGetDto: PostGetDto){
        try{
            postGetDto = DtoFactory.create(PostGetDto, postGetDto)
            await this.errorStore.validateError(postGetDto)
            const res : AxiosResponse = await PostRepositoty.getPost(postGetDto)
            this.currentPost = res.data.data
            return res.data.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async getPosts(postPageDto: PostPageDto){
        try{
            postPageDto = DtoFactory.create(PostPageDto, postPageDto)
            await this.errorStore.validateError(postPageDto);
            const res : AxiosResponse = await PostRepositoty.getPosts(postPageDto);
            this.posts = res.data.data.posts
            this.count = res.data.data.count
            return res.data.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async writePost(postWriteDto: PostWriteDto){
        try{
            postWriteDto = DtoFactory.create(PostWriteDto, postWriteDto)
            await this.errorStore.validateError(postWriteDto);
            const res : AxiosResponse = await PostRepositoty.writePost(postWriteDto);
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async updatePost(postUpdateDto: PostUpdateDto){
        try{
            postUpdateDto = DtoFactory.create(PostUpdateDto, postUpdateDto)
            await this.errorStore.validateError(postUpdateDto);
            const res : AxiosResponse = await PostRepositoty.updatePost(postUpdateDto)
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async writeComment(postWriteCommentDto:PostWriteCommentDto){
        try{
            postWriteCommentDto = DtoFactory.create(PostWriteCommentDto, postWriteCommentDto)
            await this.errorStore.validateError(postWriteCommentDto);
            const res : AxiosResponse = await PostRepositoty.writeComment(postWriteCommentDto);
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async updatePostPlusViewNumber(postPlusViewNumberDto: PostPlusViewNumberDto){
        try{
            postPlusViewNumberDto = DtoFactory.create(PostPlusViewNumberDto, postPlusViewNumberDto)
            await this.errorStore.validateError(postPlusViewNumberDto);
            const res : AxiosResponse = await PostRepositoty.updatePostPlusViewNumber(postPlusViewNumberDto);
            return res.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

    @action
    async getAllTags(tagAllDto: TagAllDto){
        try{
            tagAllDto = DtoFactory.create(TagAllDto, tagAllDto)
            await this.errorStore.validateError(tagAllDto);
            const res : AxiosResponse = await PostRepositoty.getAllTags(tagAllDto);
            this.tags = res.data.data
            return res.data.data
        } catch(e) {
            this.errorStore.handleValidateError(e)
            this.errorStore.hadnleAxiosError(e)
        }
    }

}

export default PostStore