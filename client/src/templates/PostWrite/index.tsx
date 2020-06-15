import React, { useRef, useLayoutEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import {Button, InputGroup} from '@blueprintjs/core'
import InputTag from '../../componentGroup/InputTag'

export default observer(function () {
    let editor : ReactCodeMirror.ReactCodeMirror
    let codemirror : CodeMirror.Editor
    const state = useLocalStore(()=>({
        code: ""
    }))
    const onChangeCode = (code: string) =>{
        state.code = code
    }
    const onClickBold = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`**${selectText}**`)
    }

    const onClickItalic = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`*${selectText}*`)
    }

    const onClickBlockquote = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`> ${selectText}`)
    }

    const onClickList = () => {
        const selectText = codemirror.getSelection()
        const changedText = selectText.split('\n').map((v,i)=>`- ${v}`).join("\n")
        codemirror.replaceSelection(changedText)
    }

    const onClickOrderedList = () => {
        const selectText = codemirror.getSelection()
        const changedText = selectText.split('\n').map((v,i)=>`${i+1}. ${v}`).join("\n")
        codemirror.replaceSelection(changedText)
    }

    const onClickHorizontalRule = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`---\n${selectText}`)
    }

    const onClickInlineCode = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`\`${selectText}\``)
    }

    const onClickCodeBlock = () => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`\`\`\`\n${selectText}\n\`\`\``)
    }

    const onClickHeading = (num: number) => {
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`${"#".repeat(num)} ${selectText}`)
    }

    const onClickPreview = () => {

    }

    useLayoutEffect(()=> {
        if(!codemirror){
            codemirror = editor.getCodeMirror()
            codemirror.setSize("100%", "400px")
        }
    })
    
    return (
        <>
            <InputGroup id="text-input" placeholder="제목" />
            <InputTag/>
            <Button icon="bold" onClick={onClickBold}>bold</Button>
            <Button icon="italic" onClick={onClickItalic}>Italic</Button>
            <Button icon="citation" onClick={onClickBlockquote}>Blockquote</Button>
            <Button icon="list" onClick={onClickList}>List</Button>
            <Button icon="numbered-list" onClick={onClickOrderedList}>Ordered List</Button>
            <Button icon="minus" onClick={onClickHorizontalRule}>Horizontal Rule</Button>
            <Button icon="code" onClick={onClickInlineCode}>Inline Code</Button>
            <Button icon="code-block" onClick={onClickCodeBlock}>Code Block</Button>
            {
                [1,2,3,4,5,6].map(v=>
                <Button icon="header" onClick={()=>onClickHeading(v)}>Heading {v}</Button>
                )
            }
            <Button onClick={onClickPreview}>Preview</Button>
            <CodeMirror
                ref={(ref:ReactCodeMirror.ReactCodeMirror)=>{editor=ref}}
                value={state.code}
                onChange={onChangeCode} 
                options={{
                    mode: 'markdown',
                    lineNumbers: true
                }} 
            />
            
        </>
    )
})