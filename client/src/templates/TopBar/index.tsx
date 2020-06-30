import React, { ComponentProps, useRef, Ref } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation } from '@blueprintjs/core'
import style from './topbar.module.scss'
import binds from 'classnames/bind'
import classnames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { useStore } from '../../stores'
import SearchBar from '../../components/SearchBar'
import { computed, toJS } from 'mobx'

const cx = binds.bind(style)

interface TopBarProps{
    searchBar?: boolean
}

export default observer(({searchBar = true}: TopBarProps) => {
    const state = useLocalStore(()=>({
        topbarStyle: {}
    }))
    const history = useHistory()
    const { authStore } = useStore()
    const topbarRef: Ref<HTMLDivElement>|null = useRef(null)
    const handleSignInButtonClick = () => {
        history.push("/signin")
    }
    const handleWriteButtonClick = () => {
        history.push("/write")
    }
    const handleListButtonClick = () => {
        history.push("/")
    }
    window.onscroll = function(){
        // console.log("scroll"+window.pageYOffset+" "+state.isTop)
        // state.isTop = window.pageYOffset == 0
        state.topbarStyle = window.pageYOffset == 0? {top:"0px"} : {top:"-42px"}
    }

    const location = useLocation()
    console.log(location.pathname)
    return (
        <div style={toJS(state.topbarStyle)} className={cx("topbar-fixed")}>
            <p className={cx("header")}>BLOG-V2</p>
            {
                searchBar?(
                    <div className={cx("searchWrapper")}>
                        <SearchBar/>
                    </div>
                ):null
            }
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