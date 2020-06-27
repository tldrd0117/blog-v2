import React, { ComponentProps, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation, H1 } from '@blueprintjs/core'
import style from './postview.module.scss'
import binds from 'classnames/bind'
import classnames from 'classnames'
import { useHistory, useLocation, RouteProps, RouteComponentProps, useParams } from 'react-router-dom'
import { useStore } from '../../stores'
import SearchBar from '../../components/SearchBar'
import { PostDto } from '../../models/PostDto'
import marked from 'marked'

export default observer(()=>{
    const { postId } = useParams()
    
    const state = useLocalStore(()=>({
        username: "",
        title: "",
        content: "",
        tags: [],
        comments: []
    } as PostDto))
    const { postStore } = useStore()
    const getPost = async () => {
        const data: PostDto = await postStore.getPost(postId)
        state.username = data.username
        state.title = data.title
        state.content = data.content
        state.tags = data.tags
        state.comments = data.comments

    }
    useEffect( () => {
        getPost()
    },[])

    return(
        <>
            <H1>{state.title}</H1>
            <p>{state.username}</p>
            <p>{state.tags}</p>
            <p>{marked(state.content)}</p>
            <p>{state.comments}</p>
            
        </>
    )
})