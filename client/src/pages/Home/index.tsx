import React, { Component } from "react"
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
    Position
} from "@blueprintjs/core";
import { useHistory } from 'react-router-dom'
import classNames from 'classnames/bind';
import styles from "./home.module.scss"
import { SuggestExample, ISuggestExampleState } from "../../components/SearchBar"
import { trace } from "mobx";
import { observer } from "mobx-react";
import { useStore } from "../../stores";

const cx = classNames.bind(styles)
export default observer (() => {
    const history = useHistory()
    const { authStore } = useStore()
    const handleSignInButtonClick = () => {
        history.push("/signin")
    }
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <p className={cx("header")}>BLOG-V2</p>
                {
                    (!authStore.isSignin)?<Button className={cx("signin")} onClick={handleSignInButtonClick}>SIGN IN</Button>:null
                }
                
                <SuggestExample 
                    className={cx("search")}
                    type={"search"}
                    leftElement={<Icon icon="search" />}
                    position={Position.TOP}
                    />
                <Card 
                    className={cx("card")}
                    interactive={true}
                    elevation={Elevation.TWO}>
                    <h5><a href="#">Card heading</a></h5>
                    <p>Card content</p>
                    <Button>Submit</Button>
                </Card>
            </div>
        </div>
    )
})