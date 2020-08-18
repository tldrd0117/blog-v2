import express, { Request, Response, NextFunction, Errback } from "express"
import cors from "cors"
import path from "path"
import bodyParser from 'body-parser';
import router from '../contorollers'

let clientUrl = ""
if(process.env.NODE_ENV == "production"){
    clientUrl = path.resolve(__dirname, "../../client")
} else {
    clientUrl = path.resolve(__dirname, "../../dist/client")
}

export default ({ app }:{ app : express.Application }) => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(express.static(clientUrl))
    app.use(router())
    app.use(function(err:any, req: Request, res: Response, next: NextFunction){
        if(err){
            console.log(err.message)
            res.status(500).send({
                result: false,
                error: err.message
            })
        } else {
            next()
        }
    })
    app.use('/*', express.static(clientUrl));
    
    return app
}