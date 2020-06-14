import React, { useRef } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'

export default observer(function () {
    let editor:ReactCodeMirror.ReactCodeMirror
    const state = useLocalStore(()=>({
        code: ""
    }))
    const onChangeCode = (code: string) =>{
        state.code = code
    }
    const onClickBold = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`**${selectText}**`)
    }

    const onClickItalic = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`*${selectText}*`)
    }

    const onClickBlockquote = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`> ${selectText}`)
    }

    const onClickList = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        const changedText = selectText.split('\n').map((v,i)=>`- ${v}`).join("\n")
        codemirror.replaceSelection(changedText)
    }

    const onClickOrderedList = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        const changedText = selectText.split('\n').map((v,i)=>`${i+1}. ${v}`).join("\n")
        codemirror.replaceSelection(changedText)
    }

    const onClickHorizontalRule = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`---\n${selectText}`)
    }

    const onClickInlineCode = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`\`${selectText}\``)
    }

    const onClickCodeBlock = () => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`\`\`\`\n${selectText}\n\`\`\``)
    }

    const onClickHeading = (num: number) => {
        const codemirror = editor.getCodeMirror()
        const selectText = codemirror.getSelection()
        codemirror.replaceSelection(`${"#".repeat(num)} ${selectText}`)
    }
    
    return (
        <>
            <button onClick={onClickBold}>bold</button>
            <button onClick={onClickItalic}>Italic</button>
            <button onClick={onClickBlockquote}>Blockquote</button>
            <button onClick={onClickList}>List</button>
            <button onClick={onClickOrderedList}>Ordered List</button>
            <button onClick={onClickHorizontalRule}>Horizontal Rule</button>
            <button onClick={onClickInlineCode}>Inline Code</button>
            <button onClick={onClickCodeBlock}>Code Block</button>
            {
                [1,2,3,4,5,6].map(v=>
                <button onClick={()=>onClickHeading(v)}>Heading {v}</button>
                )
            }
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