import React from 'react'
import { observer } from 'mobx-react'
import { Card, Button, Elevation, H2, H3, H6, Classes, Tag, Icon } from "@blueprintjs/core"
import style from './commentitem.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)
interface CommentItemProps{
    comment: any
    onReplyWriteClick?: Function
    depth?: number
}

export default observer((props: CommentItemProps & React.HTMLAttributes<HTMLElement>)=>{

    return <>
        <div className={cx("wrapper")}>
            <Tag style={props?.depth==2?{marginLeft:"0px"}:{}} className={cx("user")} large={true} minimal={true} icon={"user"}>{props.comment.username}</Tag>
            <div className={cx("contentsWrapper")}>
                <div className={cx("contents")}>{props.comment.content}
                    {
                        props.onReplyWriteClick?
                        <Button onClick={()=>props.onReplyWriteClick?props.onReplyWriteClick(props.comment):null} className={cx("replyWrite")}>댓글쓰기</Button>
                        :null
                    }
                    
                </div>
                {
                    props.children
                }
            </div>
        </div>
        
    </>
})