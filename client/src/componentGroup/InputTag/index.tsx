import React from 'react'
import { Button, H5, Intent, ITagProps, Switch, TagInput } from "@blueprintjs/core";
import { observer, useLocalStore } from "mobx-react";

export default observer(()=>{
    const state = useLocalStore(()=>({
        values:[] as React.ReactNode[]
    }));

    const handleClear = () => {
        state.values = []
    }

    const handleChange = (values: React.ReactNode[]) => {
        state.values = values
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
                values={state.values}
                onChange={handleChange}
            />
        </>
    )
})