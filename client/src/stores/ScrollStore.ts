import Autobind from 'autobind-decorator'
import RootStore from './RootStore'
import { observable, action, computed, trace, autorun } from 'mobx'

@Autobind
class ScrollStore{
    rootStore : RootStore

    @observable mainScroll: number = 0
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    async scroll(y:number){
        this.mainScroll = y
        console.log(y)
    }

}

export default ScrollStore