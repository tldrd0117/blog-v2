import express from 'express'
import postRouter from './routes/PostRouter'
import morgan from 'morgan'

export default () => {
    const router = express.Router()
    router.use(morgan('dev'))
    postRouter(router)
    router.get("/ping", function(req,res){
        res.send("ping....deliver")
    })
    return router
}