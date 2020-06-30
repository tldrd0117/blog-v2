import React from 'react'
import { observer } from "mobx-react";
import classNames from 'classnames/bind';
import styles from "./postsidebar.module.scss"
import { Tag, Classes } from '@blueprintjs/core';

const cx = classNames.bind(styles)

export default observer(()=>{
    return <>
        <div className={cx("sidebar")}>
            <h3 style={{paddingTop:"20px"}} className={Classes.HEADING}>Hot</h3>
            {
                ["포스트1","포스트2","포스트3"]
                .map((v,i)=><p>{`${i+1}. ${v}`}</p>)
            }
            <h3 className={Classes.HEADING}>Latest</h3>
            {
                ["포스트1","포스트2","포스트3"]
                .map((v)=><p>{v}</p>)
            }
            <h3 className={Classes.HEADING}>Tag</h3>
            {
                ["예시태그1","예시태2","예시태그3","예그1","예시그1","예시태그1","시태그1","예시1","예시태그1","예태그1"]
                .map((v)=><Tag style={{margin:"4px"}} minimal={false}>{v}</Tag>)
            }
        </div>
    </>
})