import { Service } from "typedi";
import User from "../models/user";
import { SigninDto, SignupDto, UserTokenDto } from "../models/dto/AuthDto";
import DtoFactory from "../models/dto/DtoFactory";

@Service()
export default class AuthService{
    async signin(signinDto: SigninDto) : Promise<UserTokenDto>{
        try{
            const user = await User.findOne({
                where: {
                    email: signinDto.email
                }
            })
            if(!user){
                throw new Error("USER NOT REGISTED");
            }
            const correct = await signinDto.verifyPwd(user.password)
            if(!correct){
                throw new Error("INVALID PASSWORD")
            }
            return DtoFactory.create(UserTokenDto, user).generateToken()
        } catch(e) {
            throw e;
        }
        
    }

    async signup(signupDto: SignupDto) : Promise<UserTokenDto>{
        try{
            const user = await User.findOne({
                where: {
                    email: signupDto.email
                }
            })
            if(user){
                throw new Error("이미 등록된 이메일");
            }
            console.log(user)
            const hashedPassword = await signupDto.hashPwd()
            signupDto.role = "user";
            const newUser = await User.create({
                ...signupDto,
                password: hashedPassword
            })
            console.log(newUser)
            return DtoFactory.create(UserTokenDto, newUser).generateToken()
        } catch(e) {
            console.log("err:"+e);
            throw e;
        }
        
    }

    
}