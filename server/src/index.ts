import express from "express"
import path from "path"

class App {
    public application : express.Application

    constructor(){
        this.application = express()
    }
}
const app = new App().application
app.use(express.static(path.resolve(__dirname, "../build")))
console.log(path.resolve(__dirname, "../build"))
app.listen(8080)
