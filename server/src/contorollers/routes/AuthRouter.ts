import { Router, Request, Response, NextFunction } from "express"
import { Container } from 'typedi'
import User from "../../models/user"
import AuthService from "../../services/AuthService"
import { celebrate, Joi, errors, Segments } from 'celebrate'
import { success, error } from '../factorys/ResponseFactory'
import { SigninDto, SignupDto, UserTokenDto } from "../../services/dto/AuthDto"
import DtoFactory from "../../services/dto/DtoFactory"

const router = Router()
const authService = Container.get(AuthService)

export default (appRouter: Router) => {
    appRouter.use("/auth", router)
    router.post("/signin", celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().min(5).max(50).required(),
            password: Joi.string().min(4).max(50).required()
        })
    }), async function(req: Request, res: Response, next: NextFunction){
        try{
            const signinDto = DtoFactory.create(SigninDto, req.body);
            const userTokenDto : UserTokenDto = await authService.signin(signinDto);
            const result = success({
                token: userTokenDto.token
            })
            return res.json(result).status(200);
        } catch(e){
            return next(e)
        }
    })

    router.post("/signup", celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().min(5).max(50).required(),
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().min(4).max(50).required()
        })
    }), async function(req: Request, res: Response){
        const signupDto = DtoFactory.create(SignupDto, req.body);
        const userTokenDto : UserTokenDto = await authService.signup(signupDto);
        const result = success({
            token: userTokenDto.token
        })
        return res.json(result).status(200);
    })
    appRouter.use(errors());
}