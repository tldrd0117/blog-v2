export default class DtoFactory {
    static create ( cls : Function, obj : object){
        const instance = Reflect.construct(cls, [])
        for(const key in instance){
            const objValue = obj[key]
            if(objValue)
                instance[key] = objValue
        }
        return instance
    }
}