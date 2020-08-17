import React, { ChangeEvent } from 'react'
import { observer, useLocalStore, useObserver } from 'mobx-react'
import { useStore } from '../../hooks';
import { useHistory } from 'react-router-dom'
import { SigninDto } from '../../models/AuthDto'
import { InputGroup, Button } from '@blueprintjs/core'
import InputPassword from '../../componentGroup/InputPassword'

export default observer(() => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        showPassword: false
    }))
    const { authStore, errorStore } = useStore()
    const history = useHistory();
    const handleSignInClick = async () => {
        const result = await authStore.signin({
            email: state.email,
            password: state.password
        } as SigninDto)
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
    console.log("render", errorStore.currentValidateError["email"])
    return (
    <>
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
            placeholder="패스워드"
            className={"loginPasswd"}
            value={state.password}
            onChange={handlePasswordChange}
        />
        {
            errorStore.currentValidateError["password"]?.length > 0 ? 
            errorStore.currentValidateError["password"]?.map((v: string)=><p key={v} className={"errorMsg"}>{`* ${v}`}</p>): null
        }
        <Button className={"loginButton"} onClick={handleSignInClick}>로그인</Button>
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
            .loginButton{
                align-self: center;
                margin-top: 30px;
                width: 300px;
                height: 50px;
                font-size: 18px;
                margin-bottom: 40px;
            }
            .errorMsg{
                color: red;
                width: 300px;
                margin: 4px auto;
                position: relative;
                font-size: 12px;
            }
        `}</style>
    </>)
})