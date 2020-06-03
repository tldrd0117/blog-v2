import {Min, IsEmail, Max, Length} from 'class-validator'
export class SignInDto{
    @IsEmail()
    @Length(8,50)
    email: string = "";

    @Length(8,20)
    password: string = "";
}

export class SignUpDto{
    @IsEmail()
    @Length(8,50)
    email: string = "";

    @Length(8,20)
    password: string = "";

    @Length(2,20)
    username: string = "";
}