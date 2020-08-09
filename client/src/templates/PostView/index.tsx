import React, { ComponentProps, useEffect, HTMLAttributes, useRef, Ref } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation, H1, Tag } from '@blueprintjs/core'
import style from './postview.module.scss'
import binds from 'classnames/bind'
import classnames from 'classnames'
import { useHistory, useLocation, RouteProps, RouteComponentProps, useParams } from 'react-router-dom'
import { useStore } from '../../stores'
import SearchBar from '../../components/SearchBar'
import { PostDto, PostGetDto } from '../../models/PostDto'
import marked from 'marked'
import DtoFactory from '../../models/DtoFactory'
import moment from 'moment'
import Comments from '../../componentGroup/comments'

const cx = binds.bind(style)

export default observer((props: HTMLAttributes<HTMLElement>)=>{
    const { postId } = useParams()
    
    const state = useLocalStore(()=>({
        username: "",
        title: "",
        content: "",
        tags: [],
        comments: [],
        updatedAt: "",
        view: 0,
        commentsLength: 0
    } as PostDto))
    const contentRef: Ref<HTMLParagraphElement>|null = useRef(null)
    const { postStore } = useStore()
    const getPost = async () => {
        const dto = DtoFactory.create(PostGetDto, {postId})
        const data: PostDto = await postStore.getPost(dto)
        console.log(data)
        state.username = data.username
        state.title = data.title
        state.content = data.content
        state.tags = data.tags
        state.comments = data.comments
        state.updatedAt = moment(data.updatedAt).locale("ko").fromNow()//.format("YYYY년 M월 D일")
        state.view = data.view
        state.commentsLength = data.commentsLength
    }
    useEffect(()=>{
        console.log("current")
        if(contentRef.current){
            contentRef.current.innerHTML = marked(state.content)
            console.log(marked(state.content))
        }
    }, [state.content])
    useEffect( () => {
        getPost()
    },[])

    return(
        <>
            <div className={`${props.className} ${cx("content")}`}>
                <H1>{state.title}</H1>
                <p>{state.username}</p>
                <p>{state.updatedAt}</p>
                {
                    state.tags.map((v:any, i: number)=>
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
            <Comments comments={state.comments} />
        </>
    )
})