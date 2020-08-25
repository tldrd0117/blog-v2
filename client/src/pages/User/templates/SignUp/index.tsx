import React, { ChangeEvent, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react';
import { useStore, useErrorKey } from '@/hooks';
import { useHistory } from 'react-router-dom';
import { SignupDto } from '@/models/AuthDto';
import { InputGroup, Button, Label, FormGroup } from '@blueprintjs/core';
import InputPassword from '@/components/InputPassword';
import ErrorMsg from '@/components/ErrorMsg';
export default observer(() => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        username: ""
    }))
    const errorKey = useErrorKey()
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
            <div className={"inputWrapper"}>
                <FormGroup
                    label={"이메일"}
                    labelInfo={"(필수)"}
                    >
                    <InputGroup
                        className={"loginId"}
                        placeholder="이메일"
                        large={true}
                        value={state.email}
                        onChange={handleEmailChange}
                    />
                </FormGroup>
                <ErrorMsg
                    propKey="email"
                    errorKey={errorKey}
                />
                <FormGroup
                    label={"비밀번호"}
                    labelInfo={"(필수)"}
                    >
                    <InputPassword
                        className={"loginId"}
                        placeholder="패스워드"
                        value={state.password}
                        onChange={handlePwdChange}
                    />
                </FormGroup>
                
                <ErrorMsg
                    propKey="password"
                    errorKey={errorKey}
                />
                <FormGroup
                    label={"닉네임"}
                    labelInfo={"(필수)"}
                    >
                    <InputGroup
                        className={"loginId"}
                        placeholder="닉네임"
                        large={true}
                        value={state.username}
                        onChange={handleUsernameChange}
                    />
                </FormGroup>
                
                <ErrorMsg
                    propKey="username"
                    errorKey={errorKey}
                />
                <Button className={"signUpButton"} onClick={handleCompleteClick}>완료</Button>
            </div>
            <style jsx global>{`
                @import "media.scss";
                .inputWrapper{
                    align-self: center;
                    width: 300px;
                }
                
                .signUpButton{
                    align-self: center;
                    margin-top: 30px;
                    height: 50px;
                    width: 100%;
                    font-size: 18px;
                    margin-bottom: 40px;

                }    
                @include mobile{
                    .inputWrapper{
                        align-self: center;
                        width: calc(100% - 50px);
                    }
                }
            `}</style>
        </>
    )
})