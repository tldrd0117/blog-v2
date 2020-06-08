import React, { Component, useState, Props, ChangeEvent } from "react"
import styles from "./signup.module.scss"
import classNames from 'classnames'
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { useStore } from "../../stores";
import { SignUpDto } from "../../models/auth/dto";
import { InputGroup, Button } from "@blueprintjs/core";

const cx = classNames.bind(styles)

export default () => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        username: ""
    }))
    const { authStore } = useStore();
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
        const result = authStore.signUp({
            email: state.email,
            password: state.password,
            username: state.username
        } as SignUpDto)
    }
    return(
        <>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <h2 className={cx("title")}>blog-v2</h2>
                    <InputGroup
                        className={cx("id")}
                        placeholder="이메일"
                        large={true}
                        value={state.email}
                        onChange={handleEmailChange}
                    />
                    <InputGroup
                        className={cx("id")}
                        placeholder="패스워드"
                        large={true}
                        value={state.password}
                        onChange={handlePwdChange}
                    />
                    <InputGroup
                        className={cx("id")}
                        placeholder="닉네임"
                        large={true}
                        value={state.username}
                        onChange={handleUsernameChange}
                    />
                    <Button className={cx("signUpButton")} onClick={handleCompleteClick}>완료</Button>
                </div>
            </div>
        </>
    )
}

