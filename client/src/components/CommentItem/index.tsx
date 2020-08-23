import React from 'react'
import { observer } from 'mobx-react'
import { Card, Button, Elevation, H2, H3, H6, Classes, Tag, Icon } from "@blueprintjs/core"
import style from './commentitem.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)
interface CommentItemProps{
    comment: any
    onReplyWriteClick?: Function
    depth?: number
}

export default observer((props: CommentItemProps & React.HTMLAttributes<HTMLElement>)=>{
    console.log(props.comment)
    return <>
        <div className={"wrapper"}>
            <Icon className={"userIcon"} iconSize={35} icon={"user"}/>
            <div className={"contentsWrapper"}>
                <div className={"comment"}>
                    <div className={"commentHeader"}>
                        <span className={"userName"}>{props.comment.username}</span>
                        <span className={"updatedDate"}>{props.comment.updatedFromNow}</span>
                    </div>
                    <div className={"contents"}>{props.comment.content}
                        {
                            props.onReplyWriteClick?
                            <Button onClick={()=>props.onReplyWriteClick?props.onReplyWriteClick(props.comment):null} className={"replyWrite"}>댓글쓰기</Button>
                            :null
                        }
                        
                    </div>
                </div>
                {
                    props.children
                }
            </div>
        </div>
        <style jsx global>{`
            @import "media.scss";
            .wrapper{
                display: flex;
                .userIcon{
                    padding:10px;
                }
                .user{
                    flex: 0 0 auto;
                    margin: 10px;
                    align-self: start;
                    border-radius: 13px;
                }
                .contentsWrapper{
                    flex: 1 1 auto;
                    .comment{
                        box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
                        border-radius: 13px;
                        margin: 10px 10px 10px 0px;
                        .commentHeader{
                            background-color: #f5f8fa;
                            background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
                            width: auto;
                            padding: 8px 16px 8px 16px;
                            border-radius: 13px;
                            background-color: rgba(138, 155, 168, 0.2);
                            .userName{
                                color: #182026;
                                font-weight: bold;
                            }
                            .updatedDate{
                                margin-left: 10px;

                            }
                        }
                        .contents{
                            padding: 16px;
                            word-wrap: break-word;
                            word-break: break-all;
                            color: #182026;
                            border: none;
                        }
                        
                    }
                    

                }
                
                .replyWrite{
                    margin-top: 8px;
                    color: #2965CC;
                    display: block;
                }
            }

            @include mobile{
                .wrapper{
                    .user{
                        max-width: 80px;
                        font-size: 12px;
                        span{
                            white-space: pre-wrap;
                        }
                    }
                    .contentsWrapper{
                        .contents{
                            font-size: 12px;
                        }
                        .wrapper{
                            margin-left: -70px;
                        }
                
                    }
                }
            }
        `}</style>
    </>
})