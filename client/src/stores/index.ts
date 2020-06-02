import React from 'react'
import RootStore from './RootStore'
const stores = new RootStore()
console.log({
    ...stores
});
const storesContext = React.createContext({
    ...stores
})
export const useStore = () => React.useContext( storesContext );