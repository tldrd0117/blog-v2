import { Dto } from "../dto"
export default class DtoFactory {
    static create ( cls : Dto, obj : object){
        const instance = Reflect.construct(cls as Function, [])
        for(const key in instance){
            const objValue = obj[key]
            if(objValue)
                instance[key] = objValue
        }
        return instance
    }
}