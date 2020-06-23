import React, { SyntheticEvent, ChangeEvent } from "react";

import { Suggest, ItemRenderer } from "@blueprintjs/select";
import { observer, useLocalStore } from "mobx-react";
import { MenuItem, Position, Icon, InputGroup } from "@blueprintjs/core";
import classNames from 'classnames/bind'
import style from './searchbar.module.scss'
import { values } from "mobx";
import { debounce } from "../../utils/debounce";
import { useStore } from "../../stores";

const cx = classNames.bind(style)

interface SearchBarProps{
}

export default observer((props: SearchBarProps)=> {
    const state = useLocalStore(()=>({
        value: ""
    }))

    const { postStore } = useStore()

    const handleEmailChange = (e : ChangeEvent<HTMLInputElement>) => {
        state.value = e.target.value
        debounce(function(){
            postStore.searchText = state.value
            postStore.searchPost({
                word: postStore.searchText,
                limit: 20,
                offset: 0,
                type: ["tag", "content", "title"]
            })
        },300)
    }
    
    return (
        <>
            <InputGroup
                className={cx("search")}
                placeholder="검색"
                large={true}
                value={state.value}
                onChange={handleEmailChange}
            />
        </>
    )
})