import React from 'react'
import { observer, useAsObservableSource, useLocalStore } from 'mobx-react'
import { TextArea, Button, H6} from "@blueprintjs/core"
import style from './commentwrite.module.scss'
import binder from 'classnames/bind'
import { useStore } from '../../stores'
import { useParams } from 'react-router-dom'
import { PlainToaster } from '../Toaster'

const cx = binder.bind(style)

interface CommentWriteProps{
    target: any,
    onReplyWriteClick: Function
}

//backgroundColor: f8f8f8
//backgroundColor: fcfcfc

export default observer((props: CommentWriteProps)=>{
    const { postStore, authStore } = useStore()
    const state = useLocalStore(()=>({
        contents: ""
    }))
    const { postId } = useParams()
    const { target } = props
    const isDepthOneComment = !target.username;
    let title = "새로 댓글추가"
    if(!isDepthOneComment){
        title=`${target.username}의 댓글에 댓글추가`
    }

    const handleNewClick = () => {
        props.onReplyWriteClick({})
    }

    const handleInput = (e : React.FormEvent<HTMLTextAreaElement>) => {
        state.contents = e.currentTarget.value
    }

    const handleWrite = async (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        if(!authStore.isSignin){
            PlainToaster.show({
                message: "로그인이 필요합니다",
                timeout: 2000,
                intent: "warning",
                icon: "warning-sign"
            });
            return
        }
        const result = await postStore.writeComment({
            postId,
            content: state.contents,
            parentId: !isDepthOneComment? target.id: null,
            depth: isDepthOneComment? 1 : 2,
        });
        if(result){
            postStore.getPost({ postId })
        }
    }

    return <>
        <H6 className={cx("title")}>{title} {
            target.username ?
            <Button onClick={handleNewClick} className={cx("writeBtn")}>새로 댓글추가</Button>: null
        }</H6>
        <div className={cx("wrapper")}>
            <TextArea className={cx("textbox")} onInput={handleInput}/>
            <Button className={cx("writeBtn")} onClick={handleWrite}>쓰기</Button>
        </div>
    </>
})