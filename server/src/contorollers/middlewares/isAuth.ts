import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import config from "../../config"
import DtoFactory from '../../models/dto/DtoFactory';
import {UserTokenDto} from '../../models/dto/AuthDto';

export default function(req: Request,res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.jwtSecret, (err, user)=>{
            if(err){
                next({message:"로그인이 필요합니다."})
                // return res.json({result:"invalid auth"});
            }
            res.locals.token = token;
            next();
        })

    } else {
        next({message:"로그인이 필요합니다."});
        // res.status(401)
        // res.json({result:"invalid call"}).status(401);
    }
    
}