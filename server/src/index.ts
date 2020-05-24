import express from "express"
import path from "path"
import loader from "./loaders"
import 'reflect-metadata'

const startServer = async () =>{
    const app = express()
    await loader({ expressApp: app })
    app.listen(8080)
    console.log("startServer")
}

startServer()

