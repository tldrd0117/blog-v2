import { Service } from "typedi";
import User from "../models/user";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../config';

@Service()
export default class AuthService{
    async signIn(email: string, password: string){
        console.log(email, password)
        try{
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if(!user){
                throw new Error("USER NOT REGISTED");
            }
            const correct = argon2.verify(user.password, password);
            if(!correct){
                throw new Error("invalid password")
            }
            const token = this.generateToken(user);
            
            Reflect.deleteProperty(user, 'password');
    
            return {user, token}
        } catch(e) {
            console.log("authService", e)
            throw e;
        }
        
    }

    async signUp(user: User){
        try{
            const hashedPassword = await argon2.hash(user.password);
            user.role = "user";
            User.create({
                ...user,
                password: hashedPassword
            })
            
            const token = this.generateToken(user);

            Reflect.deleteProperty(user, 'password');

            return {user, token}
        } catch(e) {
            throw e;
        }
        
    }

    private generateToken(user: User){
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                id: user.id, // We are gonna use this in the middleware 'isAuth'
                role: user.role,
                name: user.username,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret
        );

    }
}