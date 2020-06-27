import React, { ComponentProps } from 'react'
import { observer } from 'mobx-react'
import { Button, Icon, Position, Elevation } from '@blueprintjs/core'
import style from './topbar.module.scss'
import binds from 'classnames/bind'
import classnames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { useStore } from '../../stores'
import SearchBar from '../../components/SearchBar'

const cx = binds.bind(style)

interface TopBarProps{
    searchBar?: boolean
}

export default observer(({searchBar = true}: TopBarProps) => {
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
            {
                searchBar?<SearchBar/>:null
            }
            </div>
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
    )
})