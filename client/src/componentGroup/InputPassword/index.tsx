import React, { EventHandler, ChangeEvent, Attributes } from 'react'
import {InputGroup, Tooltip, Button, Intent, IInputGroupProps} from '@blueprintjs/core'
import { useLocalStore, useAsObservableSource } from 'mobx-react'
import classNames from 'classnames/bind';
import style from './inputPassword.module.scss'

const cx = classNames.bind(style)

interface InputPasswordProps{
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    className?: string
    placeholder?: string
}

export default ({value, onChange, className, placeholder} : InputPasswordProps) => {
    const prop = useAsObservableSource({
        value
    })
    const state = useLocalStore(() => ({
        showPassword: false
    }))
    const handleLockClick = () => {
        state.showPassword = !state.showPassword
    }
    const LockButton = () => (
        <Tooltip content={`${state.showPassword ? "Hide" : "Show"} Password`} disabled={false}>
            <Button
                disabled={false}
                icon={state.showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={()=>handleLockClick()}
            />
        </Tooltip>
    );
    return (
        <InputGroup
            className={className}
            disabled={false}
            large={true}
            placeholder={placeholder}
            rightElement={<LockButton/>}
            type={state.showPassword ? "text" : "password"}
            value={prop.value}
            onChange={onChange}
        />
    )
}