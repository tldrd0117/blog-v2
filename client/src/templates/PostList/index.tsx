import React, { useLayoutEffect, useEffect, ReactPropTypes, ReactComponentElement, HTMLAttributes } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"
import { useStore } from '../../stores';
import marked from 'marked'
import PostItem from '../../componentGroup/postItem'
import { useHistory } from 'react-router-dom';
import ItemCounter from '../../componentGroup/ItemCounter';

const cx = classNames.bind(styles)

export default observer((props : HTMLAttributes<HTMLElement>) => {
    const state = useLocalStore(()=>({
        posts: [],
        count: 0,
        limit: 20
    }))
    const { postStore } = useStore()
    const history = useHistory()
    const getPosts = async (offset:number) => {
        const data = await postStore.getPosts({offset, limit:state.limit});
        state.posts = data.posts
        state.count = data.count
    }
    useEffect(()=>{
        getPosts(0)
    },[])

    const handlePostItemClick = (id: number) => {
        history.push(`/view/${id}`)
    }

    const onPageChange = (page: number) => {
        getPosts((page-1)*state.limit)
    }

    if(postStore.searchText.length > 0){
        return (
            <>
                <div className={`${cx({"itemWrapper":true})} ${props.className}`}>
                {
                    postStore.searchPosts?.map((v: any, i)=>(
                        <PostItem
                            onClick={()=>handlePostItemClick(v.id)}
                            className={cx("postItem")}
                            post={v}
                            key={i}
                            />
                    ))
                }
                </div>
                
            </>
        )
    }
    return (
        <>
            <div className={`${cx({"itemWrapper":true})} ${props.className}`}>
            {
                state.posts?.map((v: any, i)=>(
                    <PostItem
                        onClick={()=>handlePostItemClick(v.id)}
                        className={cx("postItem")}
                        post={v}
                        key={i}
                        />
                ))
            }
            <ItemCounter
                count={state.count}
                limit={state.limit}
                page={1}
                unitLimit={10}
                onPageChange={onPageChange}
                />
            </div>
            
        </>
    )
})