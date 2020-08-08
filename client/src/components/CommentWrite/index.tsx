import React from 'react'
import { observer } from 'mobx-react'
import { TextArea, Button } from "@blueprintjs/core"
import style from './commentwrite.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)

interface SmallGridProps{
    head: []
    data: []
}

//backgroundColor: f8f8f8
//backgroundColor: fcfcfc

export default observer(()=>{

    return <>
        <div className={cx("wrapper")}>
            <TextArea className={cx("textbox")}/>
            <Button className={cx("writeBtn")}>쓰기</Button>
        </div>
    </>
})