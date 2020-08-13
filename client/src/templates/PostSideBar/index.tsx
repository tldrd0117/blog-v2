import React, { useEffect } from 'react'
import { observer, useLocalStore } from "mobx-react";
import classNames from 'classnames/bind';
import styles from "./postsidebar.module.scss"
import { Tag, Classes } from '@blueprintjs/core';
import { useStore } from '../../stores';
import { reaction } from 'mobx';

const cx = classNames.bind(styles)

export default observer(()=>{
    const state = useLocalStore(()=>({
        sideBarStyle: {},
    }))
    const { scrollStore, postStore } = useStore()
    reaction(
        ()=>scrollStore.mainScroll,
        (scrollY)=>{
        state.sideBarStyle = scrollY == 0? { top:"124px" }:{ top: "52px" }
    })

    useEffect(() => {
        postStore.getAllTags({limit: 10})
    },[])

    const handleTagClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        postStore.searchText = e.currentTarget.innerText
        postStore.searchPost({
            word: postStore.searchText,
            limit: 20,
            offset: 0,
            type: ["tag"]
        })
    }

    return <>
        <div style={{...state.sideBarStyle}} className={cx("sidebar")}>
            {/* <h3 style={{paddingTop:"20px"}} className={Classes.HEADING}>조회수</h3>
            {
                ["포스트1","포스트2","포스트3"]
                .map((v,i)=><><div>{`${v}`}</div><div>100</div></>)
            }
            <h3 className={Classes.HEADING}>Latest</h3>
            {
                ["포스트1","포스트2","포스트3"]
                .map((v)=><p>{v}</p>)
            } */}
            <h3 style={{paddingTop:"20px"}} className={Classes.HEADING}>Tag</h3>
            {
                postStore.tags?.map((v:any)=><Tag onClick={handleTagClick} style={{margin:"4px"}} minimal={false}>{v.tagName}</Tag>)
            }
        </div>
    </>
})