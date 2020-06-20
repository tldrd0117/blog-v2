import { Router, Request, Response, NextFunction } from "express"
import { Container } from 'typedi'
import User from "../../models/user"
import AuthService from "../../services/AuthService"
import { success, error, errorMsg } from '../factorys/ResponseFactory'
import { SigninDto, SignupDto, UserTokenDto } from "../../models/dto/AuthDto"
import { isAuth, isValid } from '../middlewares'

const router = Router()

export default (appRouter: Router) => {
    const authService = Container.get(AuthService)
    appRouter.use("/auth", router)
    router.post("/signin",
        isValid(SigninDto),
        async function(req: Request, res: Response, next: NextFunction){
        try{
            console.log(req.body)
            const signinDto = req.body
            const userTokenDto : UserTokenDto = await authService.signin(signinDto);
            const result = success({
                token: userTokenDto.token
            })
            return res.json(result).status(200);
        } catch(e){
            return next(e)
        }
    })

    router.post("/signup", 
        isValid(SignupDto),
        async function(req: Request, res: Response, next: NextFunction){
            try{
                const signupDto = req.body;
                const userTokenDto : UserTokenDto = await authService.signup(signupDto);
                const result = success({
                    token: userTokenDto.token
                })
                return res.json(result).status(200);
            } catch(e){
                return next(e)
            }
        }
    )
}