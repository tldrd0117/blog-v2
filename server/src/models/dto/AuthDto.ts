

import {Min, IsEmail, Max, Length, ValidationArguments} from 'class-validator'
import { lengthMsg, emailFormatMsg } from './messages'
import { Dto } from './index'

export class SigninDto implements Dto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(5,50, lengthMsg("이메일"))
    public email: string = ""

    @Length(40,100, lengthMsg("비밀번호"))
    public password: string = ""
}

export class SignupDto implements Dto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(8,50, lengthMsg("이메일"))
    public email: string = ""

    @Length(8,50, lengthMsg("비밀번호"))
    public password: string = ""

    @Length(2,20, lengthMsg("이름"))
    public username: string = ""
    public role: string = ""
}

export class UserTokenDto implements Dto{
    public id: number = 0
    public email: string = ""
    public username: string = ""
    public role: string = ""
    public exp: number = 0
    public token: string = ""
}

export type User = {
    id: number
    email: string
    role: string
    username: string
}