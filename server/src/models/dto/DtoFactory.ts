import { Dto } from "./index"
export default class DtoFactory {
    static create ( cls : Dto, obj : any){
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
        }
        return instance
    }
}