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
import { observer, useLocalStore } from "mobx-react";
import { useStore } from "../../stores";
import TopBar from "../../templates/TopBar";
import PostList from "../../templates/PostList";

const cx = classNames.bind(styles)
export default observer (() => {
    const state = useLocalStore(()=>({
        currentComponent: PostList
    }))
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <TopBar/>
                <state.currentComponent/>             
            </div>
        </div>
    )
})