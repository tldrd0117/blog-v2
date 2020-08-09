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
import { CSSTransition } from 'react-transition-group'


const cx = binder.bind(style)

interface CommentsProps{
    comments: any
    commentsLength: number
}

export default observer((props: CommentsProps&HTMLAttributes<HTMLElement>) => {
    const commentsRef = useRef(null)
    const bgRef = useRef(null)
    const state = useLocalStore(()=>({
        isShow: false,
        writeTarget: {}
    }))
    const toggleComments = () => {
        const commentsElement: HTMLElement = commentsRef.current!
        const bgElement: HTMLElement = bgRef.current!
        if(!state.isShow){
            commentsElement.style.height = "480px";
            bgElement.style.opacity = "0.5";

        } else {
            commentsElement.style.height = "50px";
            bgElement.style.opacity = "0";
        }
        state.isShow = !state.isShow
    }
    const startBgAnimation = () => {
        const bgElement: HTMLElement = bgRef.current!
        bgElement.style.zIndex = "100"
    }
    const endBgAnimation = () => {
        const bgElement: HTMLElement = bgRef.current!
        bgElement.style.zIndex = "-1"
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

    const handleReplyWriteClick = (target: object) => {
        state.writeTarget = target
    }


    return (
        <>
            <CSSTransition in={state.isShow} timeout={300} className={cx("modal")}
                onEnter={startBgAnimation}
                onExited={endBgAnimation}
                >
                <div ref={bgRef} 
                    onClick={handleBgClick}/>
            </CSSTransition>
            
            <div 
                ref={commentsRef}
                className={cx("comments")} 
                onClick={handleComments}>
                <H6>Comments {props.comments.length}</H6>
                {
                    state.isShow?<Button onClick={handleClose} className={cx("closeBtn")} minimal={true} icon={"cross"}/>:null
                }
                {
                    state.isShow? (<>
                        <div className={cx("commentItems")}>
                            {
                                props.comments.map((v:any)=>
                                    <CommentItem 
                                        onReplyWriteClick={handleReplyWriteClick} 
                                        comment={v} key={v.id}>
                                        {
                                            v.comments?.map((v:any)=>
                                            <CommentItem 
                                                depth={2} comment={v} key={v.id}>
                                            </CommentItem>)
                                        }
                                    </CommentItem>
                                )
                            }
                        </div>
                        <div className={cx("commentWrite")}>
                            <CommentWrite onReplyWriteClick={handleReplyWriteClick} 
                                 target={state.writeTarget}/>
                        </div>
                    </>)
                    : null
                }
                
            </div>
        </>
    )
});