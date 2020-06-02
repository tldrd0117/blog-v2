import {Min, IsEmail, Max} from 'class-validator'
export class SignInDto{
    @IsEmail()
    @Min(8)
    @Max(50)
    email: string = "";

    @Min(8)
    @Max(20)
    password: string = "";
}

export class SignUpDto{
    @IsEmail()
    @Min(8)
    @Max(50)
    email: string = "";

    @Min(8)
    @Max(20)
    password: string = "";

    @Min(2)
    @Max(20)
    username: string = "";
}