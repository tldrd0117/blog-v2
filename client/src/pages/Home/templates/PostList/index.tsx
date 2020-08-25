import React, { useLayoutEffect, useEffect, ReactPropTypes, ReactComponentElement, HTMLAttributes } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"
import { useStore } from '../../../../hooks';
import marked from 'marked'
import PostItem from '../../../../componentGroup/postItem'
import { useHistory } from 'react-router-dom';
import ItemCounter from '../../../../componentGroup/ItemCounter';
import { NonIdealState } from '@blueprintjs/core';

const cx = classNames.bind(styles)

export default observer((props : HTMLAttributes<HTMLElement>) => {
    const { postStore } = useStore()
    const state = useLocalStore(()=>({
        get posts(){
            return postStore.posts
        },
        get count(){
            return postStore.count
        },
        limit: 20,
        page: 1
    }))
    const history = useHistory()
    const updatePostPlusViewNumber = async (postId: number) => {
        postStore.updatePostPlusViewNumber({
            postId
        })
    }
    useEffect(()=>{
        if(postStore.isSearch){
            return
        }
        const getPosts = async () => {
            await postStore.getPosts({offset:0, limit:state.limit});
        }
        getPosts()
    },[postStore.searchText])

    const handlePostItemClick = (id: number) => {
        history.push(`/view/${id}`)
        updatePostPlusViewNumber(id);
    }

    const onPageChange = async (page: number) => {
        if(postStore.isSearch){
            postStore.searchPost({
                offset: (page-1)*state.limit, 
                limit: state.limit, 
                word: postStore.searchText,
                type: postStore.searchTypes
            })
        } else {
            await postStore.getPosts({offset: (page-1)*state.limit, limit:state.limit});
        }
        state.page = page
    }

    return (
        <>
            {
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
                {
                    state.posts.length==0 && postStore.isSearch?
                    <NonIdealState
                        className={cx("nonIdealState")}
                        icon={"search"}
                        title="검색결과가 없습니다"
                        // description={this.state.description ? description : undefined}
                        // action={this.state.action ? action : undefined}
                        />:null
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