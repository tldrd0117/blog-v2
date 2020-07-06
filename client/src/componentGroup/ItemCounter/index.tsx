import React from 'react'
import { observer, useAsObservableSource } from 'mobx-react'
import { count } from 'console'
import { Button } from '@blueprintjs/core'

interface ItemCounterProps{
    count: number
    page: number
    limit: number
    unitLimit: number
    onPageChange: Function
}

export default observer((props:ItemCounterProps) => {
    const state = useAsObservableSource({...props})
    const pageCount = Math.floor(state.count / state.limit) + 1
    const pagesCount = Math.floor(pageCount / state.unitLimit) + 1
    const startPage = Math.floor(state.page/10)
    let elements;
    const isStartPageUnit = state.page < 10
    const isEndPageUnit = pagesCount - state.page<10
    if(isEndPageUnit){
        elements = new Array(pageCount%10).fill(0).map((v,i)=>startPage+i+1)
    } else {
        elements = new Array(10).fill(0).map((v,i)=>startPage+i+1)
    }

    const handler = () => {
        console.log(state.count)
        console.log(pagesCount - state.page)
        console.log(startPage)
        console.log(pagesCount)
        console.log(pageCount)
    }

    return <>
        <div>
        {
            isStartPageUnit?null:<Button onClick={handler}>{"<"}</Button>
        }
        {
            elements.map(v=><Button onClick={()=>props.onPageChange(v)}>{v}</Button>)
        }
        {
            isEndPageUnit?null:<Button>{">"}</Button>
        }
        </div>
    </>
})