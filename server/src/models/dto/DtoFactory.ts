import { Dto } from "./index"
import moment from "moment"
export default class DtoFactory {
    static create ( cls : Dto, obj : any){
        if(!obj) obj = {}
        const instance = Reflect.construct(cls as Function, [])
        for(const key in instance){
            let objValue:any = ""
            if(typeof instance[key] == 'number'){
                objValue = Number(obj[key])
            } else if(typeof instance[key] == 'string'){
                objValue = ""+obj[key]
            } else {
                objValue = obj[key]
            }
            if(objValue)
                instance[key] = objValue
            this.dateFormat(key, instance);
        }
        return instance
    }
    static dateFormat(key: string, instance: Dto){
        if(key=="updatedAt" || key=="createdAt"){
            instance[key.slice(0,7)+"FromNow"] = moment(instance[key]).locale("ko").fromNow()
        }
    }
}