import React, { Component } from "react"
import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
    InputGroup,
    Icon,
    Card,
    Elevation,
    Position
} from "@blueprintjs/core";
import classNames from 'classnames/bind';
import styles from "./home.module.scss"
import { SuggestExample, ISuggestExampleState } from "../../components/SearchBar"

const cx = classNames.bind(styles)

export default class Home extends Component {
    render(){
        const menus = ["123","456","789"]
        return (
            <div className={cx("container")}>
                <p className={cx("header")}>BLOG-V2</p>
                <SuggestExample 
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
            </div>
        )
    }
}