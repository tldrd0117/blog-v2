import React, { ReactNode } from "react";
import { Icon } from "@blueprintjs/core"
import binds from 'classnames/bind'
import style from './profile.module.scss'
import moment from 'moment'

const cx = binds.bind(style)

interface ProfileProps{
    img?: string
    updatedAt: string
    username: string
    className?: string
}

const Profile = ({ img, updatedAt, username, className } : ProfileProps) => {
    if(!img){
        return (
            <div className={className}>
                <Icon className={cx("division-img")} icon="user" iconSize={30}/>
                <div className={cx("division-text")}>
                    <span>{username}</span>
                    <span>{moment(updatedAt).locale("ko").fromNow()}</span>
                </div>
            </div>
          );
    } else {
        return (<>
            </>)
    }
  
}

export default Profile