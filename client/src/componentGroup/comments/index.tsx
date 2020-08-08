import React, { useRef, useEffect, Ref, HTMLAttributes, useState, MouseEvent } from 'react'
import { Card, Button, Elevation, H2, H3, H6, Classes, Tag, Icon } from "@blueprintjs/core"
import { PostDto } from '../../models/PostDto'
import marked from 'marked'
import style from './comments.module.scss'
import binder from 'classnames/bind'
import moment from 'moment'
import Profile from '../../components/Profile'
import { useLocalStore, observer } from 'mobx-react'
import CommentItem from '../../components/CommentItem'
import CommentWrite from '../../components/CommentWrite'


const cx = binder.bind(style)

interface CommentsProps{
    comments: any
}

export default observer((props: CommentsProps&HTMLAttributes<HTMLElement>) => {
    const commentsRef = useRef(null)
    const bgRef = useRef(null)
    const state = useLocalStore(()=>({
        isShow: false
    }))
    useEffect(()=>{
        const bgElement: HTMLElement = bgRef.current!
        if(state.isShow)
            if(bgElement){ 
                bgElement.style.opacity = "0.5";
                bgElement.style.zIndex = "100";
            }
        return () => {
            if(bgElement){ 
                bgElement.style.opacity = "0";
                bgElement.style.zIndex = "-1";
            }
        }
    },[state.isShow])
    const toggleComments = () => {
        const commentsElement: HTMLElement = commentsRef.current!
        if(!state.isShow){
            commentsElement.style.height = "440px";

        } else {
            commentsElement.style.height = "50px";
        }
        state.isShow = !state.isShow
    }
    const handleComments = (e: React.MouseEvent<HTMLElement>) => {
        console.log("handleComments", state.isShow);
        if(!state.isShow){
            toggleComments();
        }
    }
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if(state.isShow){
            toggleComments();
        }
    }
    const handleBgClick = () => {
        if(state.isShow)
        toggleComments();
    }
    return (
        <>
            <div ref={bgRef} className={cx("modal")} onClick={handleBgClick}></div>
            <div 
                ref={commentsRef}
                className={cx({
                "comments":true, 
            })} onClick={handleComments}>
                <H6>Comments</H6>
                {
                    state.isShow?<Button onClick={handleClose} className={cx("closeBtn")} minimal={true} icon={"cross"}/>:null
                }
                {
                    state.isShow? (<>
                        <div className={cx("commentItems")}>
                            {
                                props.comments.map((v:any)=><CommentItem comment={v} key={v.id}/>)
                            }
                        </div>
                        <div className={cx("commentWrite")}>
                            <CommentWrite/>
                        </div>
                    </>)
                    : null
                }
                
            </div>
        </>
    )
});