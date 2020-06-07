import {ValidationArguments} from 'class-validator'
import Josa from './josa'

export const emailFormatMsg = () => {
    return {
        message: "이메일 형식이 잘못되었습니다."
    }
}

export const lengthMsg = (name: string) =>{
    return {
        message: (args: ValidationArguments) => {
            const min = args.constraints[0];
            const max = args.constraints[1];
            if(args.value.length==0)
                return `${Josa.get(name, "을/를")} 입력해주세요.`
            else if(args.value.length <= max && args.value.length >= min)
                return `${Josa.get(name, "은/는")} ${max}자 이하만 가능합니다.`
            else 
                return `${Josa.get(name, "은/는")} ${min}자 이상만 가능합니다.`
        }
    }
}