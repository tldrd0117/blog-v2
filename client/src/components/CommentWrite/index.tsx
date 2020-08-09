import React from 'react'
import { observer, useAsObservableSource } from 'mobx-react'
import { TextArea, Button, H6} from "@blueprintjs/core"
import style from './commentwrite.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)

interface CommentWriteProps{
    target: any,
    onReplyWriteClick: Function
}

//backgroundColor: f8f8f8
//backgroundColor: fcfcfc

export default observer((props: CommentWriteProps)=>{
    const {target} = props
    let title = ""
    if(target.username){
        title=`${target.username}의 댓글에 댓글추가`
    } else {
        title="새로 댓글추가";
    }

    const handleNewClick = () => {
        props.onReplyWriteClick({})
    }

    return <>
        <H6 className={cx("title")}>{title} {
            target.username ?
            <Button onClick={handleNewClick} className={cx("writeBtn")}>새로 댓글추가</Button>: null
        }</H6>
        <div className={cx("wrapper")}>
            <TextArea className={cx("textbox")}/>
            <Button className={cx("writeBtn")}>쓰기</Button>
        </div>
    </>
})