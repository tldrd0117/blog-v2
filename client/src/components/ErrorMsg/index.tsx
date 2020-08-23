import React, { ReactNode, useEffect, useMemo } from "react";
import { observer, useAsObservableSource } from "mobx-react";
import { useStore } from "../../hooks";

interface ErrorMsgProps{
    propKey: string
    errorKey: string
}

export default observer((props: ErrorMsgProps) => {
    const state = useAsObservableSource(props)
    const { errorStore } = useStore()
    const { propKey } = props;
    const isErrorFromValidation = useMemo(()=>errorStore.currentValidateError[propKey]?.length > 0
        , [errorStore.currentValidateError[propKey]])

    useEffect(()=>{
        errorStore.flush()
    },[state.errorKey])
    
    return (<>
        <div className={isErrorFromValidation? "errorWrapper":""}>
        {
            isErrorFromValidation ? 
            errorStore.currentValidateError[propKey]?.map((v: string)=><p key={v} className={"errorMsg"}>{`* ${v}`}</p>): null
        }
        </div>
        <style jsx>{`
            @import 'media.scss';
            .errorWrapper{
                margin-bottom:20px;
            }
            .errorMsg{
                color: red;
                width: 100%;
                margin: 4px auto;
                position: relative;
                font-size: 12px;
            }
        `}</style>
    </>)
})