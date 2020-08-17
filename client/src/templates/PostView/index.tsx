import React, { ComponentProps, useEffect, HTMLAttributes, useRef, Ref } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation, H1, Tag } from '@blueprintjs/core'
import style from './postview.module.scss'
import binds from 'classnames/bind'
import classnames from 'classnames'
import { useHistory, useLocation, RouteProps, RouteComponentProps, useParams } from 'react-router-dom'
import { useStore } from '../../hooks';
import SearchBar from '../../components/SearchBar'
import { PostDto, PostGetDto } from '../../models/PostDto'
import marked from 'marked'
import DtoFactory from '../../models/DtoFactory'
import moment from 'moment'
import Comments from '../../componentGroup/comments'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

import '../../utils/codemirrorModes'

const cx = binds.bind(style)

marked.setOptions({
    highlight: function(code, lang) {
        return `<textArea class="_mirror_codes__" lang="${lang}">${code}</textArea>`
    }
});

export default observer((props: HTMLAttributes<HTMLElement>)=>{
    const { postId } = useParams()
    // const state = useLocalStore(()=>({
    //     username: "",
    //     title: "",
    //     content: "",
    //     tags: [],
    //     comments: [],
    //     updatedAt: "",
    //     view: 0,
    //     commentsLength: 0
    // } as PostDto))
    const contentRef: Ref<HTMLParagraphElement>|null = useRef(null)
    const { postStore ,postStore: { currentPost } } = useStore()
    const getPost = async () => {
        const data: PostDto = await postStore.getPost({postId})
        console.log(data)
        // state.username = data.username
        // state.title = data.title
        // state.content = data.content
        // state.tags = data.tags
        // state.comments = data.comments
        // state.updatedAt = moment(data.updatedAt).locale("ko").fromNow()//.format("YYYY년 M월 D일")
        // state.view = data.view
        // state.commentsLength = data.commentsLength
    }
    useEffect(()=>{
        console.log("current")
        if(contentRef.current && currentPost.content){
            contentRef.current.innerHTML = marked(currentPost.content)
            console.log(marked(currentPost.content))
            const codeEles: HTMLCollectionOf<Element> = document.getElementsByClassName("_mirror_codes__")
            if(codeEles && codeEles.length > 0){
                Array.from(codeEles).forEach(element => {
                    const targetEle = element as HTMLTextAreaElement
                    const lang = element.getAttribute("lang")
                    const codemirror = CodeMirror.fromTextArea( targetEle,{
                        lineNumbers: true,
                        mode: lang
                    })
                    codemirror.setSize("100%","auto");
                })
            }
        }
    }, [currentPost.content])
    useEffect( () => {
        getPost()
    },[])

    return(
        <>
            <div className={`${props.className} ${cx("content")}`}>
                <H1>{currentPost.title}</H1>
                <p>{currentPost.username}</p>
                <p>{moment(currentPost.updatedAt).locale("ko").fromNow()}</p>
                {
                    currentPost.tags?.map((v:any, i: number)=>
                    <Tag
                        className={cx("tag")}
                        key={i}
                        large={true}
                        minimal={true}
                        interactive={true}
                        >{v.tagName}</Tag>
                    )
                }
                <p className={cx("postContent")} ref={contentRef}></p>
                {/* <p>{state.comments}</p> */}
            </div>
            <Comments commentsLength={currentPost.commentsLength} comments={currentPost.comments} />
        </>
    )
})