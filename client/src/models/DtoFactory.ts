import { Dto } from "./index"
export default class DtoFactory {
    static create ( cls : Dto, obj : any){
        const instance = Reflect.construct(cls as Function, [])
        for(const key in instance){
            const objValue : any = obj[key]
            if(objValue)
                instance[key] = objValue
        }
        return instance
    }
}