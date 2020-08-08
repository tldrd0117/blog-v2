import React from 'react'
import { observer } from 'mobx-react'
import { Card, Button, Elevation, H2, H3, H6, Classes, Tag, Icon } from "@blueprintjs/core"
import style from './commentitem.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)
interface CommentItemProps{
    comment: any
}

export default observer((props: CommentItemProps)=>{

    return <>
        <div className={cx("wrapper")}>
            <Tag className={cx("user")} large={true} minimal={true} icon={"user"}>{props.comment.username}</Tag>
            <div className={cx("contents")}>{props.comment.contents}</div>
        </div>
    </>
})