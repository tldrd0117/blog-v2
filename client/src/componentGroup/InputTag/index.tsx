import React from 'react'
import { Button, H5, Intent, ITagProps, Switch, TagInput, Icon } from "@blueprintjs/core";
import { observer, useLocalStore } from "mobx-react";

interface InputTagProps{
    values?:Array<string>
    change?:Function
    large?:boolean
}

export default observer(({values, change, className, large}: InputTagProps & { className?: string } )=>{
    const handleClear = () => {
        if(change)change(values)
    }
    const handleChange = (values: React.ReactNode[]) => {
        if(change) change(values)
    }
    const clearButton = (
        <Button
            icon={"cross"}
            minimal={true}
            onClick={handleClear}
        />
    );
    return (
        <>
            <TagInput
                leftIcon="tag"
                className={className}
                placeholder="태그를 입력해주세요(Enter로 구분)"
                rightElement={clearButton}
                values={values}
                large={large}
                onChange={handleChange}
            />
        </>
    )
})