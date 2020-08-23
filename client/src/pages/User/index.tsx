import React from "react"
import {
    Classes,
    Tabs,
    Tab,
    TabId,
} from "@blueprintjs/core";
import { observer, useObserver, useLocalStore } from 'mobx-react'
import Login from "../../templates/Login";
import SignUp from "../../templates/SignUp";
import { useHistory } from "react-router-dom";
import { useStore } from "../../hooks";

export default observer(() => {
    const state = useLocalStore(()=>({
        selectedTabId: "login" as TabId
    }))
    const history = useHistory()
    const { errorStore } = useStore()

    const handleTabChange = (id : TabId) => {
        state.selectedTabId = id
    }

    const handleTitleClick = () => {
        history.goBack();
    }

    return (
        <>
            <div className={"container"}>
                <div className={`${"content"} ${Classes.ELEVATION_1}`}>
                    <h2 onClick={handleTitleClick} className={"title"}>BLOG-V2</h2>
                    <Tabs id={"tabs"}
                        renderActiveTabPanelOnly={true}
                        selectedTabId={state.selectedTabId} 
                        onChange={handleTabChange}
                        vertical={false}>
                        <Tabs.Expander />
                        <Tab className={"tab"} id={"login"} title={"LOGIN"} panel={<Login/>}/>
                        <Tab className={"tab"} id={"signup"} title={"SIGN UP"} panel={<SignUp/>}/>
                        <Tabs.Expander />
                    </Tabs>
                </div>
            </div>
            <style jsx>{`

                @import "media.scss";
                .container{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                    margin: 40px 0px;
                    align-self: center;
                    border-radius: 20px;
                    height: auto;
                }
                .title{
                    margin-top: 40px;
                    align-self: center;
                    text-align: center;
                    width: 300px;
                    font-size: 30px;
                    font-family: BMEULJIRO;
                    color: #2965CC;
                }
                :global(.tab){
                    display: flex;
                    flex-direction: column;
                }
                @include mobile{
                    .content{
                        width: calc(100% - 80px);
                    }
                }
            `}</style>
        </>
    )
})
