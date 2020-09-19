import React, { HTMLAttributes } from 'react'
import { observer, useAsObservableSource } from 'mobx-react'

export default observer((props: HTMLAttributes<HTMLElement>) => {
    return <>
        <div className={"footer"}>
            <div className={"menus"}>
                <span className={"menu"}>Blog</span>
                |
                <span className={"submenu"}>About Me</span>
            </div>
            <a className={"link"} href={"https://github.com/tldrd0117/blog-v2"} target={"_blank"}>
                <img className={"github_img"} src={"images/Octocat.jpg"}/>
            </a>
            <div className={"footer-end"}>
                created4me At 2020
            </div>
        </div>
        <style jsx>{`
            @import "media.scss";
            .footer{
                display: flex;
                position: relative;
                padding: 10px;
                color: black;
                height: auto;
                width: 100%;
                border-top: 1px solid rgba(16, 22, 26, 0.15);
                background-color: white;
                flex-direction: column;
                .footer-end{
                    padding-top: 8px;
                    padding-left: 170px;
                    height: 40px;
                    color: #5c7080;;
                    font-style: italic;
                    background-color: white;
                }
                .link{
                    position: absolute;
                    margin: 10px 0px;
                    width: 52px;
                    height: 43px;
                    right: 20px;
                }
                .github_img{
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                .menus{
                    margin-top: 10px;
                    position: relative;
                    font-family: BMEULJIRO;
                    margin-left: 170px;
                    color: #2965CC;
                    .menu{
                        margin-right: 20px;
                    }
                    .submenu{
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }
            }
            
            @include mobile{
                .footer{
                    .footer-end{
                        padding: 10px;
                    }
                    .menus{
                        margin-left: 10px;
                    }
                }
            }
            @include tablet{
                .footer{
                    .footer-end{
                        padding-left: 80px;
                    }
                    .menus{
                        margin-left: 80px;
                    }
                }
            }
        `}</style>
    </>
});