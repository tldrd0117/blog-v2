import { Service } from "typedi";
import User from "../models/user";
import { SigninDto, SignupDto, UserTokenDto } from "../models/dto/AuthDto";
import DtoFactory from "../models/dto/DtoFactory";
import { Transaction } from "sequelize/types";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'
import config from '../config';


@Service()
export default class AuthService{
    async getUser(email: string, transaction?: Transaction){
        try{
            const user = await User.findOne({
                where: { email },
                transaction
            })
            return user
        } catch(e) {
            throw e
        }
    }
    async getUserIfRegisted(email: string, transaction?: Transaction){
        try{
            const user = await this.getUser(email, transaction)
            if(!user){
                throw new Error("등록되지 않은 유저입니다.")
            }
            return user;
        } catch (e) {
            throw e
        }
    }

    async getUserIfNotDuplicate(email: string, transaction?: Transaction){
        try{
            const user = await this.getUser(email, transaction)
            if(user){
                throw new Error("중복된 이메일 입니다.")
            }
            return user;
        } catch (e) {
            throw e
        }
    }

    public generateToken(userTokenDto : UserTokenDto){
        try{
            const today = new Date();
            const exp = new Date(today);
            exp.setDate(today.getDate() + 60);
            userTokenDto.exp = exp.getTime()
            userTokenDto.token = jwt.sign(
                {
                    email: userTokenDto.email, // We are gonna use this in the middleware 'isAuth'
                    role: userTokenDto.role,
                    username: userTokenDto.username,
                    exp: userTokenDto.exp,
                },
                config.jwtSecret
            );
        } catch(e) {
            throw e
        }
        return userTokenDto;
    }

    public decodeToken(userTokenDto : UserTokenDto){
        try{
            const result = jwt.decode(userTokenDto.token, {json:true});
            console.log("result:"+result, "token:"+userTokenDto.token)
            if(result){
                userTokenDto.email = result.email
                userTokenDto.username = result.username
                userTokenDto.role = result.role
                userTokenDto.exp = result.exp
                if(userTokenDto.exp){
                    const today = new Date();
                    if(today.getTime() >= userTokenDto.exp){
                        throw new Error("Expired Token")
                    }
                }
            }
        } catch(e) {
            throw e
        }
        return userTokenDto;
    }

    public hashPwd(password: string){
        try{
            return argon2.hash(password)
        } catch(e) {
            throw e
        }
    }

    public verifyPwd( hash: string, password: string){
        try{
            const correct = argon2.verify(hash, password)
            if(!correct){
                throw new Error("비밀번호가 일치하지 않습니다.")
            }
            return correct
        } catch(e){
            throw e
        }
    }

    async signin(signinDto: SigninDto) : Promise<UserTokenDto>{
        try{
            const user = await this.getUserIfRegisted(signinDto.email)
            await this.verifyPwd(user.password, signinDto.password)
            const userTokenDto = DtoFactory.create(UserTokenDto, user);
            return this.generateToken(userTokenDto)
        } catch(e) {
            throw e;
        }
        
    }

    async signup(signupDto: SignupDto) : Promise<UserTokenDto>{
        try{
            const user = await this.getUserIfNotDuplicate(signupDto.email)
            console.log(user)
            const hashedPassword = await this.hashPwd(signupDto.password)
            signupDto.role = "user";
            const newUser = await User.create({
                ...signupDto,
                password: hashedPassword
            })
            console.log(newUser)
            const userTokenDto = DtoFactory.create(UserTokenDto, newUser);
            return this.generateToken(userTokenDto)
        } catch(e) {
            throw e;
        }
        
    }

    
}