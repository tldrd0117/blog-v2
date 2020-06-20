import React, { ComponentProps } from 'react'
import { observer } from 'mobx-react'
import { Button, Icon, Position, Elevation } from '@blueprintjs/core'
import style from './topbar.module.scss'
import classNames from 'classnames/bind'
import { useHistory, useLocation } from 'react-router-dom'
import { useStore } from '../../stores'
import { SuggestExample } from '../../components/SearchBar'

const cx = classNames.bind(style)

export default observer(() => {
    const history = useHistory()
    const { authStore } = useStore()
    const handleSignInButtonClick = () => {
        history.push("/signin")
    }
    const handleWriteButtonClick = () => {
        history.push("/write")
    }
    const handleListButtonClick = () => {
        history.push("/")
    }
    const location = useLocation()
    console.log(location.pathname)
    return (
        <div className={cx("topbar-fixed")}>
            <p className={cx("header")}>BLOG-V2</p>
            <div className={cx("searchWrapper")}>
                <SuggestExample 
                    className={cx("search")}
                    type={"search"}
                    leftElement={<Icon icon="search" />}
                    position={Position.TOP}
                    />
                {
                    (!authStore.isSignin)?(
                        <Button className={cx("signin")} onClick={handleSignInButtonClick}>Sign in</Button>
                    ):
                    location.pathname=="/"?
                        <Button className={cx("signin")} onClick={handleWriteButtonClick} icon="edit"></Button>:
                    location.pathname=="/write"?
                        <Button className={cx("signin")} onClick={handleListButtonClick} icon="list"></Button>:null

                }
            </div>
        </div>
    )
})