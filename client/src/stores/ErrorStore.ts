import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'
import { Dto } from '../models/index'
import { validate, ValidationError } from 'class-validator'
import { PlainToaster } from '../components/Toaster'

@Autobind
class ErrorStore{
    rootStore : RootStore

    @observable currentValidateError: any = []
    @observable currentAxiosError: any = []
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
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
    async handleValidateError(e: any){
        this.currentValidateError = []
        if(e instanceof Array){
            if(e.every(v=>v instanceof ValidationError)){
                this.currentValidateError = e.reduce((acc, v)=> {
                    return {...acc, [v.property]: Object.keys(v.constraints).map(key=>v.constraints[key]) }
                },{})
                console.log("validateError:" + e);
            }
        }
    }

    @action
    async hadnleAxiosError(e: any){
        if(e.response){
            this.currentAxiosError = [e.response.error]
            PlainToaster.show({
                message: e.response.data.error,
                timeout: 5000,
                intent: "warning",
                icon: "warning-sign"
            });
        }
    }

}

export default ErrorStore