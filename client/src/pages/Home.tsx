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
} from "@blueprintjs/core";

export default class Home extends Component {
    render(){
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Blog-v2</Navbar.Heading>
                    <Navbar.Divider />
                    <InputGroup placeholder="Search files..."></InputGroup>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                <Button className="bp3-minimal" icon="home" text="Home" />
                    <Button className="bp3-minimal" icon="document" text="Files" />
                    <Navbar.Divider />
                    <Button className="bp3-button bp3-minimal bp3-icon-user"></Button>
                    <Button className="bp3-button bp3-minimal bp3-icon-notifications"></Button>
                    <Button className="bp3-button bp3-minimal bp3-icon-cog"></Button>
                </Navbar.Group>
            </Navbar>
        );
    }
}