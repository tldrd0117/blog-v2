import React from 'react'
import classNames from 'classnames/bind';
import styles from "./postview.module.scss"
import { observer } from "mobx-react";
import TopBar from "../../templates/TopBar";
import PostView from "../../templates/PostView";
const cx = classNames.bind(styles)

export default observer(()=>{
    return(
        <div className={cx("container")}>
            <div className={cx("content")}>
                <TopBar searchBar={false}/>
                <PostView/>             
            </div>
        </div>
    )
})