import { Container } from 'typedi'
import User from '../models/user'
import Post from '../models/post'
import Tag from '../models/tag'
import Comment from '../models/comment'
const models = {
    User, Post, Tag, Comment
}
export default async () => {
    for(var key in models){
        console.log("di:", key, models[key])
        Container.set(key, models[key])
    }
}