import React, { useLayoutEffect, useEffect, ReactPropTypes, ReactComponentElement, HTMLAttributes } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"
import { useStore } from '../../stores';
import marked from 'marked'
import PostItem from '../../componentGroup/postItem'
import { useHistory } from 'react-router-dom';

const cx = classNames.bind(styles)

export default observer((props : HTMLAttributes<HTMLElement>) => {
    const state = useLocalStore(()=>({
        posts: [],
    }))
    const { postStore } = useStore()
    const history = useHistory()
    const getPosts = async () => {
        const data = await postStore.getPosts({offset:0, limit:20});
        state.posts = data
    }
    useEffect(()=>{
        getPosts()
    },[])

    const handlePostItemClick = (id: number) => {
        history.push(`/view/${id}`)
    }

    if(postStore.searchText.length > 0){
        return (
            <>
                <div className={`${cx({"cardWrapper":true})} ${props.className}`}>
                {
                    postStore.searchPosts?.map((v: any, i)=>(
                        <PostItem
                            onClick={()=>handlePostItemClick(v.id)}
                            className={cx("card")}
                            title={v.title}
                            content={marked(v.content)}
                            key={v.id}/>
                    ))
                }
                </div>
                
            </>
        )
    }
    return (
        <>
            <div className={`${cx({"cardWrapper":true})} ${props.className}`}>
            {
                state.posts?.map((v: any, i)=>(
                    <PostItem
                        onClick={()=>handlePostItemClick(v.id)}
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