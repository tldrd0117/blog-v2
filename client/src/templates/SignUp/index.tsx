import React, { ChangeEvent } from 'react'
import { observer, useLocalStore } from 'mobx-react';
import { useStore } from '../../hooks';
import { useHistory } from 'react-router-dom';
import { SignupDto } from '../../models/AuthDto';
import { InputGroup, Button } from '@blueprintjs/core';
import InputPassword from '../../componentGroup/InputPassword';
export default observer(() => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        username: ""
    }))
    const { authStore, errorStore } = useStore();
    const history = useHistory();
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        state.email = e.target.value
    }
    const handlePwdChange = (e: ChangeEvent<HTMLInputElement>) => {
        state.password = e.target.value
    }
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        state.username = e.target.value
    }
    const handleCompleteClick = async () => {
        const result = await authStore.signup({
            email: state.email,
            password: state.password,
            username: state.username
        } as SignupDto);
        if(result){
            history.goBack();
        }
    }
    return (<>
            <InputGroup
                className={"loginId"}
                placeholder="이메일"
                large={true}
                value={state.email}
                onChange={handleEmailChange}
            />
            {
                errorStore.currentValidateError["email"]?.length > 0 ? 
                errorStore.currentValidateError["email"]?.map((v: string)=><p key={v} className={"errorMsg"}>{`* ${v}`}</p>): null
            }
            <InputPassword
                className={"loginId"}
                placeholder="패스워드"
                value={state.password}
                onChange={handlePwdChange}
            />
            {
                errorStore.currentValidateError["password"]?.length > 0 ? 
                errorStore.currentValidateError["password"]?.map((v: string)=><p key={v} className={"errorMsg"}>{`* ${v}`}</p>): null
            }
            <InputGroup
                className={"loginId"}
                placeholder="닉네임"
                large={true}
                value={state.username}
                onChange={handleUsernameChange}
            />
            {
                errorStore.currentValidateError["username"]?.length > 0 ? 
                errorStore.currentValidateError["username"]?.map((v: string)=><p key={v} className={"errorMsg"}>{`* ${v}`}</p>): null
            }
            <Button className={"signUpButton"} onClick={handleCompleteClick}>완료</Button>
            <style jsx global>{`
                .loginId{
                    align-self: center;
                    margin-top: 20px;
                    width: 300px;
                }
                .loginPasswd{
                    align-self: center;
                    margin-top: 20px;
                    width: 300px;
                }
                .signUpButton{
                    align-self: center;
                    margin-top: 30px;
                    width: 300px;
                    height: 50px;
                    font-size: 18px;
                    margin-bottom: 40px;

                }    
            `}</style>
        </>
    )
})