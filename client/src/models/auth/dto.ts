import {Min, IsEmail, Max, Length, ValidationArguments} from 'class-validator'
import { lengthMsg, emailFormatMsg } from '../../utils/validationMessage'
import { useAsObservableSource } from 'mobx-react';
import { extendObservable } from 'mobx';
export class SigninDto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(5,50, lengthMsg("이메일"))
    email: string = "";

    @Length(8,20, lengthMsg("비밀번호"))
    password: string = "";
}

export class SignupDto{
    @IsEmail(undefined, emailFormatMsg())
    @Length(8,50, lengthMsg("이메일"))
    email: string = "";

    @Length(8,20, lengthMsg("비밀번호"))
    password: string = "";

    @Length(2,20, lengthMsg("이름"))
    username: string = "";
}