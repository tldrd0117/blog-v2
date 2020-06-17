import React from 'react'
import { Button, H5, Intent, ITagProps, Switch, TagInput } from "@blueprintjs/core";
import { observer, useLocalStore } from "mobx-react";

interface InputTagProps{
    values?:Array<string>
    change?:Function
}

export default observer(({values, change}: InputTagProps)=>{
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
                placeholder="태그를 입력해주세요(Enter로 구분)"
                rightElement={clearButton}
                values={values}
                onChange={handleChange}
            />
        </>
    )
})