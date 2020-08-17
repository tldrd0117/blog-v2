import React, { useLayoutEffect, useEffect, ReactPropTypes, ReactComponentElement, HTMLAttributes } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"
import { useStore } from '../../hooks';
import marked from 'marked'
import PostItem from '../../componentGroup/postItem'
import { useHistory } from 'react-router-dom';
import ItemCounter from '../../componentGroup/ItemCounter';
import { NonIdealState } from '@blueprintjs/core';

const cx = classNames.bind(styles)

export default observer((props : HTMLAttributes<HTMLElement>) => {
    const state = useLocalStore(()=>({
        posts: [],
        count: 0,
        limit: 20,
        page: 1
    }))
    const { postStore } = useStore()
    const history = useHistory()
    const getPosts = async (offset:number) => {
        const data = await postStore.getPosts({offset, limit:state.limit});
        state.posts = data.posts
        state.count = data.count
    }
    const updatePostPlusViewNumber = async (postId: number) => {
        postStore.updatePostPlusViewNumber({
            postId
        })
    }

    useEffect(()=>{
        getPosts(0)
    },[])

    const handlePostItemClick = (id: number) => {
        history.push(`/view/${id}`)
        updatePostPlusViewNumber(id);
    }

    const onPageChange = (page: number) => { 
        getPosts((page-1)*state.limit)
        state.page = page
    }

    return (
        <>
            {
                postStore.searchText.length > 0 ?
                <div className={`${cx({"itemWrapper":true})} ${props.className}`}>
                {
                    postStore.searchPosts.length > 0 ?
                        postStore.searchPosts?.map((v: any, i)=>(
                            <PostItem
                                onClick={()=>handlePostItemClick(v.id)}
                                className={cx("postItem")}
                                post={v}
                                key={v.id}
                                />
                        )) :
                        <NonIdealState
                            className={cx("nonIdealState")}
                            icon={"search"}
                            title="검색결과가 없습니다"
                            // description={this.state.description ? description : undefined}
                            // action={this.state.action ? action : undefined}
                        />

                }
                </div> :
                <div className={`${cx({"itemWrapper":true})} ${props.className}`}>
                {
                    state.posts?.map((v: any, i)=>(
                        <PostItem
                            onClick={()=>handlePostItemClick(v.id)}
                            className={cx("postItem")}
                            post={v}
                            key={v.id}
                            />
                    ))
                }
                <ItemCounter
                    count={state.count}
                    limit={state.limit}
                    page={state.page}
                    unitLimit={10}
                    onPageChange={onPageChange}
                    />
                </div>

            }
        </>
    )
})