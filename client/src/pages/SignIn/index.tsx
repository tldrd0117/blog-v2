import React, { Component, useState, Props, ChangeEvent } from "react"
import {
    Button,
    InputGroup,
    Tooltip,
    Intent
} from "@blueprintjs/core";
import classNames from 'classnames/bind';
import styles from "./signin.module.scss"
import { useStore } from "../../stores";
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { SigninDto } from "../../models/auth/dto";
import { useHistory } from "react-router-dom";

const cx = classNames.bind(styles)

export default () => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        showPassword: false
    }))
    const { authStore } = useStore()
    const history = useHistory();
    const handleLockClick = () => {
        state.showPassword = !state.showPassword
    }
    const handleSignInClick = async () => {
        const result = await authStore.signin({
            email: state.email,
            password: state.password
        } as SigninDto)
        console.log(result)
        history.goBack()
    }
    
    const handleSignUpClick = () => {
        history.push("/signup")
    }

    const handleEmailChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.email = e.target.value
    }

    const handlePasswordChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.password = e.target.value
    }

    const LockButton = () => (
        <Tooltip content={`${state.showPassword ? "Hide" : "Show"} Password`} disabled={false}>
            <Button
                disabled={false}
                icon={state.showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={()=>handleLockClick()}
            />
        </Tooltip>
    );

    return useObserver(() => (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <h2 className={cx("title")}>blog-v2</h2>
                <InputGroup
                    className={cx("id")}
                    placeholder="아이디"
                    large={true}
                    value={state.email}
                    onChange={handleEmailChange}
                />
                <InputGroup
                    className={cx("passwd")}
                    disabled={false}
                    large={true}
                    placeholder="비밀번호"
                    rightElement={<LockButton/>}
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={handlePasswordChange}
                />
                <Button className={cx("loginButton")} onClick={handleSignInClick}>Sign in</Button>
                <Button className={cx("signUpButton")} onClick={handleSignUpClick}>Sign up</Button>
            </div>
        </div>
    ))
}
