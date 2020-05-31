import express from 'express'
import postRouter from './routes/PostRouter'
import authRouter from './routes/AuthRouter'
import morgan from 'morgan'
import middlewares from './middlewares'

export default () => {
    const router = express.Router()
    router.use(morgan('dev'))
    postRouter(router)
    authRouter(router)
    router.get("/ping", function(req,res){
        res.send("ping....deliver");
    })
    router.get("/pingAuth", middlewares.isAuth, function(req,res){
        res.send("ping....isAuth");
    })
    return router
}