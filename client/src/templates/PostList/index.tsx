import React from 'react'
import { observer } from 'mobx-react'
import { SuggestExample } from '../../components/SearchBar'
import { Icon, Position, Card, Elevation, Button } from '@blueprintjs/core'
import classNames from 'classnames/bind';
import styles from "./postlist.module.scss"

const cx = classNames.bind(styles)

export default observer(() => {
    
    return (
        <>
            <SuggestExample 
                className={cx("search")}
                type={"search"}
                leftElement={<Icon icon="search" />}
                position={Position.TOP}
                />
            <Card
                className={cx("card")}
                interactive={true}
                elevation={Elevation.TWO}>
                <h5><a href="#">Card heading</a></h5>
                <p>Card content</p>
                <Button>Submit</Button>
            </Card>
        </>
    )
})