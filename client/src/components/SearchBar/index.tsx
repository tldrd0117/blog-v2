import React, { SyntheticEvent, ChangeEvent } from "react";

import { Suggest, ItemRenderer } from "@blueprintjs/select";
import { observer, useLocalStore } from "mobx-react";
import { MenuItem, Position, Icon, InputGroup } from "@blueprintjs/core";
import classNames from 'classnames/bind'
import style from './searchbar.module.scss'
import { values } from "mobx";

const cx = classNames.bind(style)

interface SearchBarProps{
}

export default observer((props: SearchBarProps)=> {
    const state = useLocalStore(()=>({
        value: ""
    }))

    const handleEmailChange = (e : ChangeEvent<HTMLInputElement>) => {
        state.value = e.target.value
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