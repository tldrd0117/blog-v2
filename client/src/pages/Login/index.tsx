import React, { Component, useState } from "react"
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

const cx = classNames.bind(styles)

interface LoginState{
    showPassword: Boolean
}

export default class Login extends Component {
    state : LoginState = {
        showPassword: false
    }
    render(){
        const { showPassword } = this.state as LoginState;
        const handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
        const lockButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={false}>
                <Button
                    disabled={false}
                    icon={showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={handleLockClick}
                />
            </Tooltip>
        );
        return (
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <h2 className={cx("title")}>blog-v2</h2>
                    <InputGroup
                        className={cx("id")}
                        placeholder="아이디"
                        large={true}
                    />
                    <InputGroup
                        className={cx("passwd")}
                        disabled={false}
                        large={true}
                        placeholder="비밀번호"
                        rightElement={lockButton}
                        small={false}
                        type={showPassword ? "text" : "password"}
                    />
                    <Button className={cx("loginButton")}>로그인</Button>
                </div>
            </div>
        )
    }
}
