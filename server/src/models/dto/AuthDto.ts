import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../../config';
import {Min, IsEmail, Max, Length, ValidationArguments} from 'class-validator'
import { lengthMsg, emailFormatMsg } from './messages'
import { Dto } from './index'

export class SigninDto implements Dto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(5,50, lengthMsg("이메일"))
    public email: string = ""

    @Length(40,100, lengthMsg("비밀번호"))
    public password: string = ""
    public verifyPwd(password: string){
        return argon2.verify(password, this.password)
    }
}

export class SignupDto implements Dto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(8,50, lengthMsg("이메일"))
    public email: string = ""

    @Length(8,20, lengthMsg("비밀번호"))
    public password: string = ""

    @Length(2,20, lengthMsg("이름"))
    public username: string = ""
    public role: string = ""
    public hashPwd(){
        return argon2.hash(this.password)
    }
}

export class UserTokenDto implements Dto{
    private email: string = ""
    private username: string = ""
    private role: string = ""
    public token: string = ""

    public generateToken(){
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        this.token = jwt.sign(
            {
                email: this.email, // We are gonna use this in the middleware 'isAuth'
                role: this.role,
                username: this.username,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret
        );
        return this;
    }
}