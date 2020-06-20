import { Request, Response, NextFunction } from 'express';
import DtoFactory from "../../models/dto/DtoFactory"
import { validate } from 'class-validator';
import { errorMsg } from '../factorys/ResponseFactory';
import { Dto } from "../../models/dto"

export default (dto: Dto) => {
    return async function(req: Request,res: Response, next: NextFunction){
        const dtoInstance = DtoFactory.create(dto, req.body);
        const {isError, errors} = await errorMsg( validate(dtoInstance) )
        console.log(req.body)
        req.body = dtoInstance
        console.log(isError, errors, req.body)
        if(isError){
            next(errors)
        } else {
            next()
        }
    }
}
    