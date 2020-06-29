import React, { useRef, useEffect, Ref, HTMLAttributes } from 'react'
import { Card, Button, Elevation, H3, H6, Classes, Tag } from "@blueprintjs/core"
import { PostDto } from '../../models/PostDto'
import marked from 'marked'
import style from './postitem.module.scss'
import binder from 'classnames/bind'

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
                <H3>{props.post?.title}</H3>
                {props.post?.tags.map((v:any,i:number)=>
                    <Tag
                        className={cx("tag")}
                        key={i}
                        minimal={true}
                        >{v.tagName}</Tag>)}
                <h6 className={`${Classes.HEADING} ${cx('content')}`} ref={contentRef}></h6>
                
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