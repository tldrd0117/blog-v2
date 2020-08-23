import React, { Component } from "react"
import { observer, useLocalStore } from "mobx-react";
import TopBar from "../../templates/TopBar";
import PostWrite from "../../templates/PostWrite";

export default observer (() => {
    return (
        <>
            <div className={"container"}>
                <div className={"content"}>
                    <TopBar searchBar={false}/>
                    <PostWrite className={"main-content"}/>             
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
                    flex-direction: column;
                }

                .main-content{
                    margin-top: 124px;
                    display: flex;
                    align-self: center;
                    flex-direction: column;
                }
                @include mobile{
                    .main-content{
                        margin-top: 80px;
                    }
                }
            `}</style>
        </>
    )
})