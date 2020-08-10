import { Position, Toaster } from "@blueprintjs/core";
import style from './toaster.module.scss'
import binder from 'classnames/bind'

const cx = binder.bind(style)

export const PlainToaster = Toaster.create({
    className: cx("plainToaster"),
    position: Position.BOTTOM,
});