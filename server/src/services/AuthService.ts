import { Service } from "typedi";
import User from "../models/user";
import argon2 from 'argon2';

@Service()
export default class AuthService{
    async signIn(email, password){
        const user = await User.findOne({
            where: email
        })
        argon2.verify(user!!.password, password);
        
    }

    //salt 생성
    //
    async signUp(){

    }
}