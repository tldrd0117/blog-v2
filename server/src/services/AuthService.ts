import { Service } from "typedi";
import User from "../models/user";
import argon2 from 'argon2';
import { WhereOptions } from "sequelize";

@Service()
export default class AuthService{
    async signIn(email: string, password: string){
        try{
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if(user){
                const correct = argon2.verify(user.password, password);
            }
        } catch(e) {
            throw e;
        }
        
    }

    //salt 생성 
    async signUp(user: User){
        try{
            const hashedPassword = await argon2.hash(user.password)
            User.create({
                ...user,
                password: hashedPassword
            })
        } catch(e) {
            throw e;
        }
        
    }
}