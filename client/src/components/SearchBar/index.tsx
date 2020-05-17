/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { H5, MenuItem, Switch, InputGroup, IInputGroupProps, IPopoverProps } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import {
    areFilmsEqual,
    createFilm,
    filmSelectProps,
    IFilm,
    maybeAddCreatedFilmToArrays,
    maybeDeleteCreatedFilmFromArrays,
    renderCreateFilmOption,
    TOP_100_FILMS,
} from "./searchModel";

const FilmSuggest = Suggest.ofType<IFilm>();

export interface ISuggestExampleState {
    allowCreate: boolean;
    closeOnSelect: boolean;
    createdItems: IFilm[];
    fill: boolean;
    film: IFilm;
    items: IFilm[];
    minimal: boolean;
    openOnKeyDown: boolean;
    resetOnClose: boolean;
    resetOnQuery: boolean;
    resetOnSelect: boolean;
}


export class SuggestExample extends React.PureComponent<IInputGroupProps&IPopoverProps> {
    public state: ISuggestExampleState = {
        allowCreate: false,
        closeOnSelect: true,
        createdItems: [],
        fill: false,
        film: TOP_100_FILMS[0],
        items: filmSelectProps.items,
        minimal: true,
        openOnKeyDown: false,
        resetOnClose: false,
        resetOnQuery: true,
        resetOnSelect: false
    };

    // private handleAllowCreateChange = this.handleSwitchChange("allowCreate");
    // private handleCloseOnSelectChange = this.handleSwitchChange("closeOnSelect");
    // private handleOpenOnKeyDownChange = this.handleSwitchChange("openOnKeyDown");
    // private handleMinimalChange = this.handleSwitchChange("minimal");
    // private handleFillChange = this.handleSwitchChange("fill");
    // private handleResetOnCloseChange = this.handleSwitchChange("resetOnClose");
    // private handleResetOnQueryChange = this.handleSwitchChange("resetOnQuery");
    // private handleResetOnSelectChange = this.handleSwitchChange("resetOnSelect");

    public render() {
        const { allowCreate, film, minimal, ...flags } = this.state;

        const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
        const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : undefined;

        return (
            <FilmSuggest
                {...filmSelectProps}
                {...flags}
                inputProps={this.props}
                createNewItemFromQuery={maybeCreateNewItemFromQuery}
                createNewItemRenderer={maybeCreateNewItemRenderer}
                inputValueRenderer={this.renderInputValue}
                itemsEqual={areFilmsEqual}
                // we may customize the default filmSelectProps.items by
                // adding newly created items to the list, so pass our own.
                items={this.state.items}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={this.handleValueChange}
                popoverProps={{ minimal, ...this.props }}
                />
        );
    }

    private renderInputValue = (film: IFilm) => film.title;

    private handleValueChange = (film: IFilm) => {
        // delete the old film from the list if it was newly created
        const { createdItems, items } = maybeDeleteCreatedFilmFromArrays(
            this.state.items,
            this.state.createdItems,
            this.state.film,
        );
        // add the new film to the list if it is newly created
        const { createdItems: nextCreatedItems, items: nextItems } = maybeAddCreatedFilmToArrays(
            items,
            createdItems,
            film,
        );
        this.setState({ createdItems: nextCreatedItems, film, items: nextItems });
    };

}