import React, { SyntheticEvent, ChangeEvent } from "react";

import { Suggest, ItemRenderer } from "@blueprintjs/select";
import { observer, useLocalStore } from "mobx-react";
import { MenuItem, Position, Icon } from "@blueprintjs/core";


interface SearchData {
    id: string;
    word: string;
    score: number;
    type: string;
}

const renderer: ItemRenderer<SearchData> = (data, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${data.word}`;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={data.type.toString()}
            key={data.score}
            onClick={handleClick}
            text={text}
        />
    );
};

interface SearchBarProps{
    className: string
    type: string
    leftElement: JSX.Element
}

export default observer((props: SearchBarProps)=> {
    const state = useLocalStore(()=>({
        value: ""
    }))

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        state.value = e.target.value
        console.log(state.value)
    }
    
    return (
        <>
            <Suggest
                fill={false}
                inputProps={{
                    type:"search",
                    leftElement: <Icon icon="search" />,
                    onChange: onChangeInputValue
                }}
                
                inputValueRenderer={(searchData)=>searchData.word}
                items={[{
                    id: "123",
                    word: "text",
                    score: 898989,
                    type: "tag"
                }]}
                
                noResults={<MenuItem disabled={true} text="No results." />}
                itemRenderer={renderer}
                popoverProps={{ minimal: false, position: Position.TOP }}
            /> 
        </>
    )
})