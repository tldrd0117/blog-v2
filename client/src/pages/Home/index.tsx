import React, { Component } from "react"
import classNames from 'classnames/bind';
import styles from "./home.module.scss"
import { observer, useLocalStore } from "mobx-react";
import TopBar from "../../templates/TopBar";
import PostList from "../../templates/PostList";

const cx = classNames.bind(styles)
export default observer (() => {
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <TopBar/>
                <PostList/>             
            </div>
        </div>
    )
})