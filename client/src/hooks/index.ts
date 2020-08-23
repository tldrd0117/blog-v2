import React from 'react'
import { storesContext } from "../stores/index";
import mainScroll from "./mainScroll"
import mediaQuery from './mediaQuery'
import errorKey from './errorKey'

export const useStore = () => React.useContext( storesContext );
export const useScrollTop = mainScroll
export const useMediaQuery = mediaQuery
export const useErrorKey = errorKey
