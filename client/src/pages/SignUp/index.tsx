import React, { Component, useState, Props, ChangeEvent } from "react"
import styles from "./signup.module.scss"
import classNames from 'classnames/bind'
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { useStore } from "../../stores";
import { SignupDto } from "../../models/AuthDto";
import { InputGroup, Button } from "@blueprintjs/core";
import LinkButton from "../../components/LinkButton"
import { useHistory } from "react-router-dom";
import InputPassword from "../../componentGroup/InputPassword";

const cx = classNames.bind(styles)

export default observer(() => {
    const state = useLocalStore(()=>({
        email: "",
        password: "",
        username: ""
    }))
    const { authStore } = useStore();
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
        console.log(result);
        history.goBack();
    }
    return (<>
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
                    <InputPassword
                        className={cx("id")}
                        placeholder="패스워드"
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
        </>)
})


