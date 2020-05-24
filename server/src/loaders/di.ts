import { Container } from 'typedi'
import { models } from '../models'
export default async () => {
    for(var key in models){
        console.log("di:", key, models[key])
        Container.set(key, models[key])
    }
}