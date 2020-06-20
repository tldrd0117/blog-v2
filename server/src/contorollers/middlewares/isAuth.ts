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
                return res.json({result:"invalid auth"});
            }
            res.locals.token = token;
            return next();
        })

    } else {
        res.json({result:"invalid call"}).status(401);
    }
    
}