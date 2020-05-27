import { Service } from "typedi";
import User from "../models/user";
import argon2 from 'argon2';
import crypto from 'crypto'

@Service()
export default class AuthService{
    async signIn(email, password){
        const user = await User.findOne({
            where: email
        })
        if(user){
            const correct = argon2.verify(user.password, password);
        }
    }

    //salt 생성 
    //
    async signUp(user: User){
        const salt = crypto.randomBytes(32)
        const hashedPassword = argon2.hash(user.password, {salt})

    }
}