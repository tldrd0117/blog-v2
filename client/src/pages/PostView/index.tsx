import React from 'react'
import { observer } from "mobx-react";
import TopBar from "../../templates/TopBar";
import PostView from "../../templates/PostView";

export default observer(()=>{
    return(
        <>
        <div className={"container"}>
            <div className={"content"}>
                <TopBar searchBar={false}/>
                <PostView className={"main-content"}/>             
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
                    justify-content: center;
                }
                .main-content{
                    margin-top: 124px;
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