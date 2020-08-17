import React from 'react'
import RootStore from './RootStore'
const stores = new RootStore()
export const storesContext = React.createContext({
    ...stores
})