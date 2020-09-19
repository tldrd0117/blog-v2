import React, { Component } from "react"
import { observer, useLocalStore } from "mobx-react";
import TopBar from "../../componentGroup/TopBar";
import PostList from "./templates/PostList";
import PostSideBar from "./templates/PostSideBar";
import Footer from "@/componentGroup/Footer";

export default observer (() => {
    return (
        <>
            <div className={"container"}>
                <div className={"content"}>
                    <TopBar scrollAnimation={true}/>
                    <PostList className={"main-content"}/>       
                    <PostSideBar/>
                    <Footer/>
                </div>
            </div>
            <style jsx global>{`
                @import 'media.scss';
                .container{
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
                .content{
                    display: flex;
                    width: 100%;
                    align-self: center;
                    flex-direction: column;
                }
                .main-content{
                    margin-top: 124px;
                    padding-bottom: 40px;
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