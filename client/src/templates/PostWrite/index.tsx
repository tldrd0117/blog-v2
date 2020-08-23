import React, { useRef, useLayoutEffect, ChangeEvent, HTMLAttributes, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import {Button, InputGroup, ButtonGroup, Popover, Position, MenuItem, Menu, FormGroup} from '@blueprintjs/core'
import InputTag from '../../componentGroup/InputTag'
import { useStore, useErrorKey } from '../../hooks';
import { PostWriteDto, PostDto } from '../../models/PostDto'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { reaction } from 'mobx'
import ErrorMsg from '../../components/ErrorMsg'

export default observer(function (props : HTMLAttributes<HTMLElement>) {
    let codemirror : CodeMirror.Editor
    const params: any = useParams()
    const history = useHistory()
    const isNew = !params.postId
    const { postStore } = useStore()
    const state = useLocalStore(()=>({
        title: isNew? "" : postStore.currentPost.title,
        code: isNew? "" : postStore.currentPost.content,
        tagValues: isNew? [] as Array<string> : postStore.currentPostTags,
        iconOnly: true
    }))
    const errorKey = useErrorKey()
    useEffect(()=>{
        console.log(errorKey)
        const getPost = async () => {
            await postStore.getPost({postId:params.postId})
            const { currentPost:{ title, content }, currentPostTags } = postStore
            state.title = title
            state.code = content
            state.tagValues = currentPostTags
            codemirror.setValue(state.code)
        }
        if(!isNew){
            getPost()
        }
        // codemirror.setValue(state.code)
    },[])

    const onChangeCode = (code: string) =>{
        state.code = code
    }

    const onClickBold = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n**${selectText}**`)
            codemirror.focus()
            codemirror.setCursor(line+1,2)
        } else {
            codemirror.replaceSelection(`**${selectText}**`)
            codemirror.focus()
            codemirror.setCursor(line,2)
        }
    }

    const onClickItalic = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n*${selectText}*`)
            codemirror.focus()
            codemirror.setCursor(line+1,1)

        } else {
            codemirror.replaceSelection(`*${selectText}*`)
            codemirror.focus()
            codemirror.setCursor(line,1)

        }
    }

    const onClickBlockquote = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n> ${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line+1,2)

        } else {
            codemirror.replaceSelection(`> ${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line,2)
            
        }
    }

    const onClickList = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            const changedText = "\n"+selectText.split('\n').map((v,i)=>`- ${v}`).join("\n")
            codemirror.replaceSelection(changedText)
            codemirror.focus()
            codemirror.setCursor(line+1,2)

        } else {
            const changedText = selectText.split('\n').map((v,i)=>`- ${v}`).join("\n")
            codemirror.replaceSelection(changedText)
            codemirror.focus()
            codemirror.setCursor(line,2)
            
        }
    }

    const onClickOrderedList = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            const changedText = "\n"+selectText.split('\n').map((v,i)=>`${i+1}. ${v}`).join("\n")
            codemirror.replaceSelection(changedText)
            codemirror.focus()
            codemirror.setCursor(line+1,3)

        } else {
            const changedText = selectText.split('\n').map((v,i)=>`${i+1}. ${v}`).join("\n")
            codemirror.replaceSelection(changedText)
            codemirror.focus()
            codemirror.setCursor(line,3)
            
        }
    }

    const onClickHorizontalRule = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n---\n${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line+2,0)

        } else {
            codemirror.replaceSelection(`---\n${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line+1,0)
            
        }
    }

    const onClickInlineCode = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n\`${selectText}\``)
            codemirror.focus()
            codemirror.setCursor(line+1,1)

        } else {
            codemirror.replaceSelection(`\`${selectText}\``)
            codemirror.focus()
            codemirror.setCursor(line,1)
            
        }
    }

    const onClickCodeBlock = () => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n\`\`\`\n${selectText}\n\`\`\``)
            codemirror.focus()
            codemirror.setCursor(line+2,0)

        } else {
            codemirror.replaceSelection(`\`\`\`\n${selectText}\n\`\`\``)
            codemirror.focus()
            codemirror.setCursor(line+1,0)
            
        }
    }

    const onClickHeading = (num: number) => {
        const selectText = codemirror.getSelection()
        const {line, ch} = codemirror.getCursor()
        if(ch>0){
            codemirror.setCursor(line, codemirror.getLine(line).length)
            codemirror.replaceSelection(`\n${"#".repeat(num)} ${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line+1,1+num)

        } else {
            codemirror.replaceSelection(`${"#".repeat(num)} ${selectText}`)
            codemirror.focus()
            codemirror.setCursor(line,1+num)
        }
        
    }

    const onClickPreview = () => {

    }

    const onChangeTags = (values : Array<string>) => {
        state.tagValues = values
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        state.title = e.target.value
    }

    const onChangeCodeMirrorRef = (editor: ReactCodeMirror.ReactCodeMirror) => {
        if(editor){
            codemirror = editor.getCodeMirror()
            codemirror.setSize("100%", (window.innerHeight*0.5)+"px")
        }
    }

    const onClickComplete = async () => {
        //postWrite
        console.log(state)
        if(isNew){
            const result = await postStore.writePost({
                title: state.title,
                content: state.code,
                tags: state.tagValues
            })
            if(result)
                history.goBack()
        } else {
            const result = await postStore.updatePost({
                postId: params.postId,
                title: state.title,
                content: state.code,
                tags: state.tagValues
            })
            if(result)
                history.goBack()
        }

    }
    
    return (
        <>
            <div className={`writeWrapper ${props.className}`}>
                <InputGroup className={"title"} large={true} id="text-input" placeholder="제목" value={state.title} onChange={onChangeTitle} />
                <ErrorMsg propKey={"title"} errorKey={errorKey}/>
                <InputTag className={"tag"} large={true} values={state.tagValues} change={onChangeTags}/>
                <div className={"buttonWrapper"}>
                    <Button icon="bold" onClick={onClickBold}>{state.iconOnly?null:"bold"}</Button>
                    <Button icon="italic" onClick={onClickItalic}>{state.iconOnly?null:"Italic"}</Button>
                    <Button icon="citation" onClick={onClickBlockquote}>{state.iconOnly?null:"Blockquote"}</Button>
                    <Button icon="list" onClick={onClickList}>{state.iconOnly?null:"List"}</Button>
                    <Button icon="numbered-list" onClick={onClickOrderedList}>{state.iconOnly?null:"Ordered List"}</Button>
                    <Button icon="minus" onClick={onClickHorizontalRule}>{state.iconOnly?null:"Horizontal Rule"}</Button>
                    <Button icon="code" onClick={onClickInlineCode}>{state.iconOnly?null:"Inline Code"}</Button>
                    <Button icon="code-block" onClick={onClickCodeBlock}>{state.iconOnly?null:"Code Block"}</Button>
                    <ButtonGroup>
                        <Popover content={
                            <Menu>
                                {
                                    [1,2,3,4,5,6].map(v=>
                                        <MenuItem key={v} icon="header" text={`Heading ${v}`} onClick={()=>onClickHeading(v)} />
                                    )
                                }
                            </Menu>
                        } position={Position.BOTTOM_LEFT}>
                            {
                                <Button icon="header">{state.iconOnly?null:"Heading"}</Button>
                                
                            }
                        </Popover>

                    </ButtonGroup>
                    <Button onClick={onClickPreview}>Preview</Button>
                </div>
                <CodeMirror
                    className={"writeCodemirror"}
                    ref={(ref:ReactCodeMirror.ReactCodeMirror)=>{onChangeCodeMirrorRef(ref)}}
                    value={state.code}
                    onChange={onChangeCode} 
                    options={{
                        mode: 'markdown',
                        lineNumbers: true
                    }} 
                />
                <ErrorMsg propKey={"content"} errorKey={errorKey}/>
                <div className={"buttonWrapper"}>
                    <Button onClick={onClickComplete}>Complete</Button>
                </div>
                
            </div>
            <style jsx>{`
                @import 'media.scss';
                @mixin width() {
                    @include mobile{
                        width: calc(100% - 40px);
                    }
                    width: 600px;
                }
                .writeWrapper{
                    align-self: center;
                    @include width;
                    :global(.tag){
                        margin-top: 10px;
                    }
                    .buttonWrapper{
                        margin-top: 10px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                    :global(.writeCodemirror){
                        margin-top: 10px;
                    }
                }
            `}</style>
        </>
    )
})