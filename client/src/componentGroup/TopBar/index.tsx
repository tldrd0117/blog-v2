import React, { ComponentProps, useRef, Ref, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation, Classes } from '@blueprintjs/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useStore, useScrollTop, useMediaQuery } from '../../hooks';
import SearchBar from '../../components/SearchBar'
import { computed, toJS, reaction } from 'mobx'
import { MediaQuery } from '../../hooks/mediaQuery'

interface TopBarProps{
    searchBar?: boolean
    scrollAnimation?: boolean
}

export default observer(({searchBar = true, scrollAnimation = false}: TopBarProps) => {
    const state = useLocalStore(()=>({
        topbarStyle: {top:"0px", padding:"20px 0px"},
        searchBarStyle: { large: true }
    }))
    const history = useHistory()
    const { authStore, postStore } = useStore()
    const params:any = useParams()
    const handleSignInButtonClick = () => {
        history.push("/signin")
    }
    const handleWriteButtonClick = () => {
        history.push("/write")
    }
    const handleEditButtonClick = () => {
        history.push(`/write/${postStore.currentPost.id}`)
    }
    const handleListButtonClick = () => {
        history.push("/")
    }
    const handleDeleteButtonClick = async () => {
        if(params.postId){
            const data = await postStore.deletePost({postId: params.postId})
            if(data && data.result){
                history.goBack()
            }
        }
    }
    if(scrollAnimation){
        const scrollY = useScrollTop("topbar")
        const isMobile = useMediaQuery(MediaQuery.mobile)
        useEffect(()=> {
            console.log(scrollY, isMobile)
            if(isMobile)
                state.topbarStyle = scrollY ? {top:"0px", padding:"20px 0px"} : {top:"-42px", padding:"10px 0px"}
            else
                state.topbarStyle = scrollY ? {top:"0px", padding:"20px 0px"} : {top:"0px", padding:"10px 0px"}
            state.searchBarStyle = scrollY ? { large: true }:{ large: false }
        },[scrollY, isMobile])

    }
    // window.onscroll = function(){
    //     // console.log("scroll"+window.pageYOffset+" "+state.isTop)
    //     // state.isTop = window.pageYOffset == 0
    //     state.topbarStyle = window.pageYOffset == 0? {top:"0px", padding:"20px 0px"} : {top:"-42px", padding:"10px 0px"}
    //     state.searchBarStyle = window.pageYOffset == 0? { large: true }:{ large: false }
    // }

    const location = useLocation()
    return (
        <>
            <div style={toJS(state.topbarStyle)} className={`topbar-fixed ${Classes.ELEVATION_0}`}>
                <p className={"header"}>BLOG-V2</p>
                {
                    searchBar?(
                        <div className={`searchWrapper`}>
                            <SearchBar {...state.searchBarStyle}/>
                        </div>
                    ):null
                }
                <div className={"buttonWrapper"}>
                    {
                        (location.pathname=="/write" || location.pathname.startsWith("/view"))?
                        <Button className={`signin`} onClick={handleListButtonClick}>리스트</Button>:null
                    }
                    {
                        (!authStore.isSignin)?(
                            <Button className={`signin`} onClick={handleSignInButtonClick}>로그인</Button>
                        ):
                        location.pathname=="/"?
                            <Button className={`signin`} onClick={handleWriteButtonClick}>새로쓰기</Button>:null
                    }
                    {
                        postStore.isAuthor ? (<>
                        {
                            (authStore.isSignin && location.pathname.startsWith("/view"))?
                                <Button className={`signin`} onClick={handleEditButtonClick}>수정하기</Button>:null
                        }
                        {
                            (location.pathname=="/write" || location.pathname.startsWith("/view"))?
                            <Button className={`signin`} onClick={handleDeleteButtonClick}>삭제하기</Button>:null
                        }
                        </>):null
                    }
                    
                </div>
            </div>
            <style jsx>{`
                @import "media.scss";
                .topbar-fixed{
                    width: 100%;
                    position: fixed;
                    display: flex;
                    flex-direction: row;
                    background-color: white;
                    z-index: 10;
                    align-items: center;
                    // border-bottom: 1px solid $light-gray1;
                    transition: top 0.3s, padding 0.3s;
                }

                .header{
                    width: auto;
                    text-align: left;
                    margin: 0px;
                    margin-left: 20px;
                    font-size: 18px;
                    font-family: BMEULJIRO;
                    color: #2965CC;
                }

                .searchWrapper{
                    width: 400px;
                    display: flex;
                    margin-left: 90px;
                    position: relative;
                    
                }

                .buttonWrapper{
                    position: absolute;
                    display: flex;
                    right: 20px;
                    :global(.signin){
                        width: 80px;
                        height: 22px;
                        margin-left: 16px;
                        position: relative;
                    }
                }

                @include mobile{
                    .topbar-fixed{
                        align-items: flex-start;
                        flex-direction: column;
                    }
                    .searchWrapper{
                        margin-top: 20px;
                        width: calc(100% - 40px);
                        margin-left: 20px;
                    }
                }

                @include tablet{
                    .searchWrapper{
                        // width: calc(100% - 40px);
                        margin-left: 20px;
                    }
                }
    
            `}</style>
        </>
    )
})