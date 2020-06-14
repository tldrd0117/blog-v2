import { ValidationError } from "class-validator"

export const success = (obj:object) => {
    return {result:true, ...obj}
}

export const error = (obj:object) => {
    return {result:false, ...obj}
}

export const errorMsg =  async (validatePromise:Promise<ValidationError[]>) => {
    const validationErrors : ValidationError[] = await validatePromise
    if(validationErrors.length > 0){
        const errors : string[] = [];
        validationErrors.forEach(v=>{
            for(var key in v.constraints){
                errors.push(v.constraints[key])
            }
        })
        return {isError: true, errors}
    } else {
        return {isError: false, errors: null}
    }
}

