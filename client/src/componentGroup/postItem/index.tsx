import React, { useRef, useEffect, Ref, HTMLAttributes } from 'react'
import { Card, Button, Elevation, H2, H3, H6, Classes, Tag, Icon } from "@blueprintjs/core"
import { PostDto } from '../../models/PostDto'
import marked from 'marked'
import style from './postitem.module.scss'
import binder from 'classnames/bind'
import moment from 'moment'
import Profile from '../../components/Profile'

const cx = binder.bind(style)

interface PostItemProps{
    post: any
}

export default (props: PostItemProps&HTMLAttributes<HTMLElement>) => {
    const contentRef : Ref<HTMLParagraphElement>|null = useRef(null)
    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.innerHTML = marked(props.post?.content || "")
        }
    }, [contentRef])
    return (
        <>
            <div className={props.className} 
                onClick={props.onClick}>
                <H2>{props.post?.title}</H2>
                {props.post?.tags.map((v:any,i:number)=>
                    <Tag
                        className={cx("tag")}
                        key={i}
                        minimal={true}
                        >{v.tagName}</Tag>)}
                <p className={`bp3-text-muted ${cx('content')}`} ref={contentRef}></p>
                <p className={cx("username")}>{props.post?.username}</p>
                <p className={cx("time")}>{moment(props.post?.updatedAt).locale("ko").fromNow()}</p>
                <div className={cx("indexes")}>
                    <Tag className={cx("view")} icon="eye-open" minimal={true}>234</Tag>
                    {/* <Tag className={cx("thumbs-up")} icon="thumbs-up" minimal={true}>234</Tag> */}
                    <Tag className={cx("comment")} icon="comment" minimal={true}>234</Tag>
                </div>

            </div>
        </>
    // <Card
    //     onClick={()=>props.onClick?props.onClick() : undefined}
    //     key={props.key}
    //     className={props.className}
    //     interactive={true}
    //     elevation={Elevation.TWO}>
    //     <h5><a href="#">{props.title}</a></h5>
    //     <p ref={ref}></p>
    //     <Button>보기</Button>
    // </Card>
    )
}