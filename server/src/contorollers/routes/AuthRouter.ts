import { Router, Request, Response, NextFunction } from "express"
import { Container } from 'typedi'
import User from "../../models/user"
import AuthService from "../../services/AuthService"
import { celebrate, Joi, errors, Segments } from 'celebrate'

const router = Router()
const authService = Container.get(AuthService)

export default (appRouter: Router) => {
    appRouter.use("/auth", router)
    router.post("/signin", celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().min(5).max(50).required(),
            password: Joi.string().min(4).max(20).required()
        })
    }), async function(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body
            const result = await authService.signIn(email, password);
            return res.json(result).status(200);
        } catch(e){
            return next(e)
        }
    })

    router.post("/signup", celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().min(5).max(50).required(),
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().min(4).max(20).required()
        })
    }), async function(req: Request, res: Response){
        const user = User.build(req.body)
        const result = await authService.signUp(user);
        return res.json(result).status(200);
    })
    appRouter.use(errors());
}