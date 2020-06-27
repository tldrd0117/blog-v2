import React, { useRef, useEffect, Ref } from 'react'
import { Card, Button, Elevation } from "@blueprintjs/core"

interface PostItemProps{
    className?: string
    title: string
    content: string
    key: string
    onClick?: Function
}

export default (props: PostItemProps) => {
    const ref : Ref<HTMLParagraphElement>|null = useRef(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.innerHTML = props.content
        }
    }, [ref])
    return (
    <Card
        onClick={()=>props.onClick?props.onClick() : undefined}
        key={props.key}
        className={props.className}
        interactive={true}
        elevation={Elevation.TWO}>
        <h5><a href="#">{props.title}</a></h5>
        <p ref={ref}></p>
        <Button>보기</Button>
    </Card>
    )
}