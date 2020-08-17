import React, { SyntheticEvent, ChangeEvent } from "react";

import { observer, useLocalStore } from "mobx-react";
import { MenuItem, Position, Icon, InputGroup, Popover, Menu, Button, MenuDivider } from "@blueprintjs/core";
import classNames from 'classnames/bind'
import style from './searchbar.module.scss'
import { values, reaction } from "mobx";
import { debounce } from "../../utils/debounce";
import { useStore } from "../../hooks";

const cx = classNames.bind(style)

interface SearchBarProps{
    large?:boolean
}

export default observer((props: SearchBarProps)=> {
    const state = useLocalStore(()=>({
        value: "",
        searchOption: ["tag", "content", "title"],
        searchText: "전체"
    }))

    const { postStore } = useStore()

    const search = () => {
        debounce(function(){
            if(!state.value){
                postStore.searchText = ""
                return;
            }
            postStore.searchText = state.value
            postStore.searchPost({
                word: postStore.searchText,
                limit: 20,
                offset: 0,
                type: state.searchOption
            })
        },300)
    }
    reaction(()=>postStore.searchText,
    ()=>{
        state.value = postStore.searchText
    })

    const handleSearchTextChange = (e : ChangeEvent<HTMLInputElement>) => {
        state.value = e.target.value
        search()
    }

    const handleSearchOptions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target = e.target as HTMLAnchorElement
        state.searchText = target.textContent || ""
        if(target.textContent == "전체"){
            state.searchOption = ["tag", "content", "title"]
        } else if(target.textContent == "제목"){
            state.searchOption = ["title"]
        } else if(target.textContent == "내용"){
            state.searchOption = ["content"]
        } else if(target.textContent == "태그"){
            state.searchOption = ["tag"]
        }
        search()
    }

    const searchOptions = (
        <Popover
            content={
                <Menu>
                    <MenuItem onClick={handleSearchOptions} text="전체" />
                    <MenuDivider/>
                    <MenuItem onClick={handleSearchOptions} text="제목" />
                    <MenuItem onClick={handleSearchOptions} text="내용" />
                    <MenuItem onClick={handleSearchOptions} text="태그" />
                </Menu>
            }
            disabled={false}
            position={Position.BOTTOM_RIGHT}
        >
            <Button 
                minimal={true} rightIcon="caret-down">
                {state.searchText}
            </Button>
        </Popover>
    );
    
    return (
        <>
            <InputGroup
                className={cx("search")}
                placeholder="검색"
                leftIcon="search"
                round={true}
                fill={true}
                rightElement={searchOptions}
                large={props.large}
                value={state.value}
                onChange={handleSearchTextChange}
            />
        </>
    )
})