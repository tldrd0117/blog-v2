import React, { ComponentProps, useEffect, HTMLAttributes, useRef, Ref } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Button, Icon, Position, Elevation, H1, Tag } from '@blueprintjs/core'
import { useHistory, useLocation, RouteProps, RouteComponentProps, useParams } from 'react-router-dom'
import { useStore } from '@/hooks';
import { PostDto, PostGetDto } from '@/models/PostDto'
import marked from 'marked'
import moment from 'moment'
import Comments from '@/componentGroup/comments'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import '@/utils/codemirrorModes'
import { searchMode } from '@/utils/codemirrorModes';

// marked.setOptions({
//     highlight: function(code, lang) {
//         return `<textArea class="_mirror_codes__" lang="${lang}">${code}</textArea>`
//     }
// });

export default observer((props: HTMLAttributes<HTMLElement>)=>{
    const localStore = useLocalStore(()=>({
        isLoading: true
    }))
    const { postId } : any = useParams()
    const contentRef: Ref<HTMLParagraphElement>|null = useRef(null)
    const { postStore ,postStore: { currentPost } } = useStore()
    const getPost = async () => {
        postStore.currentPost = {};
        const data: PostDto = await postStore.getPost({postId})
        localStore.isLoading = false;
    }
    useEffect(()=>{
        console.log("current")
        if(contentRef.current && currentPost.content){
            contentRef.current.innerHTML = marked(currentPost.content)
            // const codeEles: HTMLCollectionOf<Element> = document.getElementsByClassName("_mirror_codes__")
            const codeEles = document.querySelectorAll(".postContent pre>code")
            if(codeEles && codeEles.length > 0){
                Array.from(codeEles).forEach(element => {
                    const targetEle = element as HTMLElement
                    const value = element.textContent
                    element.innerHTML = ''
                    const lang = element.getAttribute("class")?.replace("language-","")
                    const codemirror = CodeMirror(targetEle,{
                        lineNumbers: true,
                        mode: searchMode(lang),
                        value,
                        theme: "default"
                    })
                    codemirror.setSize("100%","auto");
                    // codemirror.setOption("theme", "material")

                })
            }
            // const codeInlineEles = document.querySelectorAll(".postContent p>code")
            // if(codeInlineEles && codeInlineEles.length > 0){
            //     Array.from(codeInlineEles).forEach(element => {
            //         const targetEle = element as HTMLElement
            //         const value = element.textContent
            //         element.innerHTML = ''
            //         const codemirror = CodeMirror(targetEle,{
            //             lineNumbers: false,
            //             value,
            //             theme: "default"
            //         })
            //         codemirror.setSize("100%","auto");
                    
            //     })
            // }
        }
    }, [currentPost.content])
    useEffect( () => {
        getPost()
    },[])

    return(
        <>
            <div className={`${props.className} postView`}>
                <H1 className={localStore.isLoading?"bp3-skeleton loading-title":""}>{currentPost.title}</H1>
                <p>{currentPost.username}</p>
                <p className={localStore.isLoading?"loading-empty":""}>{moment(currentPost.updatedAt).locale("ko").fromNow()}</p>
                {
                    currentPost.tags?.map((v:any, i: number)=>
                    <Tag
                        className={"tag"}
                        key={i}
                        large={true}
                        minimal={true}
                        interactive={true}
                        >{v.tagName}</Tag>
                    )
                }
                <p className={`postContent ${localStore.isLoading?"bp3-skeleton loading-contents":""}`} ref={contentRef}></p>
                {/* <p>{state.comments}</p> */}
            </div>
            <Comments commentsLength={currentPost.commentsLength} comments={currentPost.comments} />
            <style jsx global>{`
                @import "index.scss";
                .CodeMirror *{
                    font-family: Consolas;
                    font-size: 18px;
                }
                .loading-title{
                    height: 70px;
                }
                .loading-empty{
                    height: 0px;
                    overflow: hidden;
                }
                .loading-contents{
                    height: 700px;
                }
                p{
                    font-size: 18px;
                    line-height: 27px;
                }
                .postView{
                    width: 700px;
                    justify-self: center;
                    margin-bottom: 60px;
                }
                .tag{
                    margin-left: 10px;
                }
                .postContent{
                    margin-top: 30px;
                }
                blockquote{
                    padding: 1em 20px 1em 20px;
                    border-left: 3px solid #000;
                    margin: 0px;
                    p{
                        margin: 0px;
                    }
                }
                table{
                    border-spacing: 0;
                    border-collapse: collapse;
                    box-shadow: $pt-elevation-shadow-2;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }

                table td:first-child{
                    white-space:nowrap;
                }

                table thead tr{
                    border-bottom: 1px solid rgb(128, 128, 128);
                }

                table tbody tr:not(:last-child){
                    border-bottom: 1px solid rgb(128, 128, 128);
                }

                table td,th{
                    text-align: left;
                    padding: 16px;
                }

                .postContent p>code{
                    background-color: #f8f8f8;
                    color: rgb(41, 101, 204);
                    padding: 4px;
                    margin: 1px;
                    border-radius: 4px;
                }
                
                @include mobile{
                    .content{
                        width: 100%;
                        padding: 20px;
                        margin-bottom: 80px;
                    }
                    .CodeMirror{
                        width: 300px !important;
                    }
                }

            `}</style>
        </>
    )
})