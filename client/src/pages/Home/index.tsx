import React, { Component } from "react"
import { observer, useLocalStore } from "mobx-react";
import TopBar from "../../componentGroup/TopBar";
import PostList from "./templates/PostList";
import PostSideBar from "./templates/PostSideBar";

export default observer (() => {
    return (
        <>
            <div className={"container"}>
                <div className={"content"}>
                    <TopBar scrollAnimation={true}/>
                    <PostList className={"main-content"}/>       
                    <PostSideBar/>      
                </div>
            </div>
            <style jsx global>{`
                @import 'media.scss';
                .container{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                }
                .content{
                    display: flex;
                    width: 100%;
                    align-self: center;
                }
                .main-content{
                    margin-top: 124px;
                }
                @include mobile{
                    .content{
                        flex-direction: column;
                    }
                }

                @include tablet{
                    .content{
                        flex-direction: column;
                    }
                }
            `}</style>
        </>
    )
})