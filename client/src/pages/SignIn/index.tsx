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
import { SigninDto } from "../../models/AuthDto";
import { useHistory } from "react-router-dom";
import InputPassword from "../../componentGroup/InputPassword";

const cx = classNames.bind(styles)

export default () => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        showPassword: false
    }))
    const { authStore } = useStore()
    const history = useHistory();
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
                <InputPassword
                    placeholder="패스워드"
                    className={cx("passwd")}
                    value={state.password}
                    onChange={handlePasswordChange}
                />
                <Button className={cx("loginButton")} onClick={handleSignInClick}>Sign in</Button>
                <Button className={cx("signUpButton")} onClick={handleSignUpClick}>Sign up</Button>
            </div>
        </div>
    ))
}
