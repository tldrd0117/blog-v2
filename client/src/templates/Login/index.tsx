import React, { ChangeEvent, useEffect } from 'react'
import { observer, useLocalStore, useObserver } from 'mobx-react'
import { useStore, useErrorKey } from '../../hooks';
import { useHistory } from 'react-router-dom'
import { SigninDto } from '../../models/AuthDto'
import { InputGroup, Button, Label, FormGroup } from '@blueprintjs/core'
import InputPassword from '../../componentGroup/InputPassword'
import ErrorMsg from '../../components/ErrorMsg';

export default observer(() => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        showPassword: false,
    }))
    const errorKey = useErrorKey()
    const { authStore, errorStore } = useStore()
    const history = useHistory();
    const handleSignInClick = async () => {
        const result = await authStore.signin({
            email: state.email,
            password: state.password
        })
        if(result){
            history.goBack()
        }
    }

    const handleEmailChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.email = e.target.value
    }

    const handlePasswordChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.password = e.target.value
    }
    

    return (
    <>
        <div className={"inputWrapper"}>
            <FormGroup
                label={"이메일"}
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
                >
                <InputPassword
                    placeholder="비밀번호"
                    className={"loginPasswd"}
                    value={state.password}
                    onChange={handlePasswordChange}
                />
            </FormGroup>
            <ErrorMsg
                propKey="password"
                errorKey={errorKey}
            />
            <Button className={"loginButton"} onClick={handleSignInClick}>로그인</Button>
        </div>
        <style jsx global>{`
            @import 'media.scss';
            .inputWrapper{
                align-self: center;
                width: 300px;
            }
            .loginButton{
                margin-top: 30px;
                width: 100%;
                height: 50px;
                font-size: 18px;
                margin-bottom: 40px;
            }
            @include mobile{
                .inputWrapper{
                    width: calc(100% - 50px);
                }
            }
        `}</style>
    </>)
})