import React, { useLayoutEffect, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"
import { useStore } from '../../stores';
import marked from 'marked'
import PostItem from '../../componentGroup/postItem'

const cx = classNames.bind(styles)

export default observer(() => {
    const state = useLocalStore(()=>({
        posts: [],
    }))
    const { postStore } = useStore()
    const getPosts = async () => {
        const data = await postStore.getPosts({offset:0, limit:20});
        state.posts = data
    }
    useEffect(()=>{
        getPosts()
    },[])
    return (
        <>
            <div className={cx("cardWrapper")}>
            {
                state.posts?.map((v: any, i)=>(
                    <PostItem
                        className={cx("card")}
                        title={v.title}
                        content={marked(v.content)}
                        key={v.id}/>
                ))
            }
            </div>
            
        </>
    )
})