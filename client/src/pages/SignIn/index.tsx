import React, { Component, useState, Props, ChangeEvent } from "react"
import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
    InputGroup,
    Icon,
    Card,
    Elevation,
    Position,
    Tooltip,
    Intent
} from "@blueprintjs/core";
import classNames from 'classnames/bind';
import styles from "./login.module.scss"
import { useStore } from "../../stores";
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { SignInDto } from "../../models/auth/dto";

const cx = classNames.bind(styles)

export default () => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        showPassword: false
    }))
    const { authStore } = useStore()
    const handleLockClick = () => {
        state.showPassword = !state.showPassword
    }
    const handleSignInClick = async () => {
        const signInDto = new SignInDto();
        signInDto.email = state.email
        signInDto.password = state.password
        authStore.signIn(signInDto)
    }

    const handleEmailChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.email = e.target.value
    }

    const handlePasswordChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        state.password = e.target.value
    }

    const LockButton = (
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
                    rightElement={LockButton}
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={handlePasswordChange}
                />
                <Button className={cx("loginButton")} onClick={handleSignInClick}>로그인</Button>
            </div>
        </div>
    ))
}
