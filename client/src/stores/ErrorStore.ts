import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { Dto } from '../models/index'
import { validate, ValidationError } from 'class-validator'
import { PlainToaster } from '../components/Toaster'
import ErrorMsg from '../components/ErrorMsg'

@Autobind
class ErrorStore{
    rootStore : RootStore
    
    @observable currentValidateError: { [key:string] : { [key:string] : any } } = {}
    @observable currentAxiosError: { [key:string] : string } = {}

    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    flush(){
        this.currentValidateError = {}
        this.currentAxiosError = {}
    }

    @action
    async validateError(dto: Dto){
        const error = await validate(dto)
        console.log(dto, error)
        if(error.length){
            throw error
        }
        return true
    }

    @action
    async handleValidateError(e: any, errorObj?: object){
        if(!errorObj) errorObj = {result: false}
        if(e instanceof Array){
            if(e.every(v=>v instanceof ValidationError)){
                const errMsg = e.reduce((acc, v)=> {
                    return {...acc, [v.property]: Object.keys(v.constraints).map(key=>v.constraints[key]) }
                },{})
                this.currentValidateError = errMsg
                console.log("validateError:" + e);
                return {
                    ...errorObj,
                    validateError : errMsg
                }
            }
        }
    }

    @action
    async hadnleAxiosError(e: any, errorObj?: object){
        if(!errorObj) errorObj = {result: false}
        if(e.response){
            this.currentAxiosError = {error: e.response.data.error}
            PlainToaster.show({
                message: e.response.data.error,
                timeout: 5000,
                intent: "warning",
                icon: "warning-sign"
            });
            return {
                ...errorObj,
                ioError: e.response.data.error
            }
        }
    }

}

export default ErrorStore