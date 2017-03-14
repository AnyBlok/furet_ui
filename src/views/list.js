/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import Multi from './multi';
import plugin from '../plugin';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import ActionViewList from 'material-ui/svg-icons/action/view-list';

/**
 * Add Icon for List view
**/
plugin.set(['views', 'icon'], {List: (props) => {
    return <ActionViewList />;
}});

class TableBodyExtended extends TableBody {
    createRowCheckboxColumn(rowProps) {
        if (!this.props.displayRowCheckbox) {
            return null;
        }

        const key = `${rowProps.rowNumber}-cb`;
        const disabled = !this.props.selectable;
        const checkbox = (
            <Checkbox
                ref="rowSelectCB"
                name={key}
                value="selected"
                disabled={disabled}
                checked={rowProps.selected}
            />
        );

        return (
            <TableRowColumn
                key={key}
                columnNumber={0}
                style={{
                    width: 24,
                    cursor: disabled ? 'not-allowed' : 'inherit',
                    height: 32,
                }}
            >
                {checkbox}
            </TableRowColumn>
        );
    }
}

/**
 * List view
 *
**/
export class List extends Multi {
    call_server () {
        this.json_post(
            '/list/get', 
            {
                model: this.props.model,
                filter: this.state.search,
            },
            {
                onSuccess: (results) => {
                    this.props.dispatchAll(results);
                },
            },
        );
    }
    /**
     * call by click on row
    **/
    onRowSelection(selectedRows) {
        const selectedIds = selectedRows == 'all' ? this.props.ids : _.map(selectedRows, i => this.props.ids[i]);
        this.setState({selectedIds})
    }
    /**
     * render line
    **/
    renderLine (lineId) {
        const data = Object.assign(
            {}, 
            this.props.data[lineId], 
            this.props.computed[lineId], 
            this.props.change[lineId]
              ),
              selected = this.state.selectedIds.indexOf(lineId) != -1;
        return (
            <TableRow 
                key={lineId}
                hoverable={true}
                selectable={this.props.selectable}
                style={{minHeight: 32}}
            >
                {_.map(this.props.headers || [], header => (
                    <TableRowColumn 
                        style={{padding: 0, height: 32}}
                        key={header.name}
                        selected={selected}
                    >
                        <div 
                            style={{
                                minHeight: 32,
                                paddingTop: 8
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.onEntrySelect(lineId);
                            }}
                        >
                            {this.getField(
                                'List', 
                                header.type, 
                                header,
                                data[header.name]
                            )}
                        </div>
                    </TableRowColumn>
                ))}
            </TableRow>
        );
    }
    render () {
        return (
            <div>
                {this.renderSearchBar()}
                <Table
                    fixedHeader={true}
                    fixedFooter={true}
                    selectable={this.props.selectable}
                    multiSelectable={this.props.selectable}
                    onRowSelection={this.onRowSelection.bind(this)}
                >
                    <TableHeader
                        displaySelectAll={this.props.selectable}
                        adjustForCheckbox={this.props.selectable}
                        enableSelectAll={this.props.selectable}
                    >
                        <TableRow>
                            {_.map(this.props.headers || [], header => (
                                <TableHeaderColumn 
                                    style={{padding: 0}}
                                    key={header.name}
                                >
                                    {header.label}
                                </TableHeaderColumn>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBodyExtended
                        displayRowCheckbox={this.props.selectable}
                        showRowHover={true}
                        stripedRows={true}
                        deselectOnClickaway={false}
                    >
                        {_.map(this.props.ids || [], id => {
                            return this.renderLine(id);
                        })}
                    </TableBodyExtended>
                </Table>
            </div>
        )
    }
}

plugin.set(['views', 'type'], {List})

export default List
