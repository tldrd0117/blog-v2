import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../../config';
export class SigninDto{
    public email: string = ""
    public password: string = ""
    public verifyPwd(password: string){
        return argon2.verify(password, this.password)
    }
}
export class SignupDto{
    public email: string = ""
    public password: string = ""
    public username: string = ""
    public role: string = ""
    public hashPwd(){
        return argon2.hash(this.password)
    }
}

export class UserTokenDto{
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