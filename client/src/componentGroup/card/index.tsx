import React from 'react'
import { Card, Button, Elevation } from "@blueprintjs/core"

interface CardProps{
    className?: string
}

export default (props: CardProps) => {
    return (
    <Card
        {...props}
        interactive={true}
        elevation={Elevation.TWO}>
        <h5><a href="#">Card heading</a></h5>
        <p>Card content</p>
        <Button>Submit</Button>
    </Card>
    )
}