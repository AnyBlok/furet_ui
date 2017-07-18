/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {defaultState, mutations} from '../../store/modules/data';

describe('store.state.data', () => {
    let state;
    const menus = [
        {
            'label': 'Customer',
            'image': {'type': 'font-icon', 'value': 'fa-user'},
            'actionId': '2',
            'id': '1',
            'submenus': [],
        },
        {
            'label': 'Setting',
            'image': {'type': 'font-icon', 'value': 'fa-user'},
            'actionId': '',
            'id': '2',
            'submenus': [
                {
                    'label': 'Category',
                    'image': {'type': '', 'value': ''},
                    'actionId': '3',
                    'id': '3',
                    'submenus': [],
                },
                {
                    'label': 'Address',
                    'image': {'type': '', 'value': ''},
                    'actionId': '4',
                    'id': '4',
                    'submenus': [],
                },
            ],
        },
    ];
    beforeEach(() => {
        state = JSON.parse(JSON.stringify(defaultState));
    });
    it('update unexisting action', () => {
        const action = {
            actionId: '1',
            label: 'Action : 1',
            views: [
                {
                    viewId: '1',
                    type: 'List',
                },
                {
                    viewId: '2',
                    type: 'Thumbnail',
                },
                {
                    viewId: '3',
                    type: 'Form',
                    unclickable: true,
                },
            ],
        };
        const expected = {
            actions: {
                '1': {
                    label: 'Action : 1',
                    views: [
                        {
                            viewId: '1',
                            type: 'List',
                        },
                        {
                            viewId: '2',
                            type: 'Thumbnail',
                        },
                        {
                            viewId: '3',
                            type: 'Form',
                            unclickable: true,
                        },
                    ],
                }
            },
            views: {},
            data: {},
            changes: {},
            spaces: {},
        }
        mutations.UPDATE_ACTION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update existing view', () => {
        state.actions['1'] = {test: 'Test'}
        chai.expect(state).to.deep.equal({actions: {'1': {test: 'Test'}}, views: {}, data: {}, changes: {}, spaces: {}});
        const action = {
            actionId: '1',
            label: 'Action : 1',
            views: [
                {
                    viewId: '1',
                    type: 'List',
                },
                {
                    viewId: '2',
                    type: 'Thumbnail',
                },
                {
                    viewId: '3',
                    type: 'Form',
                    unclickable: true,
                },
            ],
        };
        const expected = {
            actions: {
                '1': {
                    label: 'Action : 1',
                    views: [
                        {
                            viewId: '1',
                            type: 'List',
                        },
                        {
                            viewId: '2',
                            type: 'Thumbnail',
                        },
                        {
                            viewId: '3',
                            type: 'Form',
                            unclickable: true,
                        },
                    ],
                }
            },
            views: {},
            data: {},
            changes: {},
            spaces: {},
        }
        mutations.UPDATE_ACTION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting view', () => {
        const action = {
            viewId: '1',
            viewType: 'List',
            label: 'View : 1',
            creatable: true,
            deletable: true,
            selectable: true,
            onSelect: '3',
            model: 'Test',
            headers: [
                {
                    name: 'id',
                    label: 'ID',
                    numeric: true,
                    component: 'furet-ui-list-field-integer',
                },
                {
                    name: 'name',
                    label: 'Label',
                    sortable: true,
                    component: 'furet-ui-list-field-string',
                },
                {
                    name: 'bool',
                    label: 'Boolean',
                    component: 'furet-ui-list-field-boolean',
                },
                {
                    name: 'state',
                    label: 'State',
                    selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
                    component: 'furet-ui-list-field-selection',
                },
            ],
            search: [],
            buttons: [],
            onSelect_buttons: [],
            fields: ["id", "name", "bool", "state"],
        };
        const expected = {
            actions: {},
            views: {
                '1': {
                    viewType: 'List',
                    label: 'View : 1',
                    creatable: true,
                    deletable: true,
                    selectable: true,
                    onSelect: '3',
                    model: 'Test',
                    headers: [
                        {
                            name: 'id',
                            label: 'ID',
                            numeric: true,
                            component: 'furet-ui-list-field-integer',
                        },
                        {
                            name: 'name',
                            label: 'Label',
                            sortable: true,
                            component: 'furet-ui-list-field-string',
                        },
                        {
                            name: 'bool',
                            label: 'Boolean',
                            component: 'furet-ui-list-field-boolean',
                        },
                        {
                            name: 'state',
                            label: 'State',
                            selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
                            component: 'furet-ui-list-field-selection',
                        },
                    ],
                    search: [],
                    buttons: [],
                    onSelect_buttons: [],
                    fields: ["id", "name", "bool", "state"],
                },
            },
            data: {},
            changes: {},
            spaces: {},
        }
        mutations.UPDATE_VIEW(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update existing view', () => {
        state.views['1'] = {test: 'Test'};
        const action = {
            viewId: '1',
            viewType: 'List',
            label: 'View : 1',
            creatable: true,
            deletable: true,
            selectable: true,
            onSelect: '3',
            model: 'Test',
            headers: [
                {
                    name: 'id',
                    label: 'ID',
                    numeric: true,
                    component: 'furet-ui-list-field-integer',
                },
                {
                    name: 'name',
                    label: 'Label',
                    sortable: true,
                    component: 'furet-ui-list-field-string',
                },
                {
                    name: 'bool',
                    label: 'Boolean',
                    component: 'furet-ui-list-field-boolean',
                },
                {
                    name: 'state',
                    label: 'State',
                    selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
                    component: 'furet-ui-list-field-selection',
                },
            ],
            search: [],
            buttons: [],
            onSelect_buttons: [],
            fields: ["id", "name", "bool", "state"],
        };
        const expected = {
            actions: {},
            views: {
                '1': {
                    test: 'Test',
                    viewType: 'List',
                    label: 'View : 1',
                    creatable: true,
                    deletable: true,
                    selectable: true,
                    onSelect: '3',
                    model: 'Test',
                    headers: [
                        {
                            name: 'id',
                            label: 'ID',
                            numeric: true,
                            component: 'furet-ui-list-field-integer',
                        },
                        {
                            name: 'name',
                            label: 'Label',
                            sortable: true,
                            component: 'furet-ui-list-field-string',
                        },
                        {
                            name: 'bool',
                            label: 'Boolean',
                            component: 'furet-ui-list-field-boolean',
                        },
                        {
                            name: 'state',
                            label: 'State',
                            selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
                            component: 'furet-ui-list-field-selection',
                        },
                    ],
                    search: [],
                    buttons: [],
                    onSelect_buttons: [],
                    fields: ["id", "name", "bool", "state"],
                },
            },
            data: {},
            changes: {},
            spaces: {},
        }
        chai.expect(state).to.deep.equal({views: {'1': {test: 'Test'}}, actions: {}, data: {}, changes: {}, spaces: {}});
        mutations.UPDATE_VIEW(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting data 1', () => {
        const action = {
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
            }
        };
        const expected = {
            actions: {},
            views: {},
            data: {
                'Test': {
                    '1': {
                        id: 1,
                        name: 'Label',
                        state: 'new',
                        bool: true,
                    },
                },
            },
            changes: {},
            spaces: {},
        };
        mutations.UPDATE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting data 1', () => {
        state.data = {
            'Test': {
                '2': {
                    id: 2,
                    name: 'Label 2',
                    state: 'new',
                    bool: true,
                },
            },
        };
        const action = {
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
            }
        };
        const expected = {
            actions: {},
            views: {},
            data: {
                'Test': {
                    '1': {
                        id: 1,
                        name: 'Label',
                        state: 'new',
                        bool: true,
                    },
                    '2': {
                        id: 2,
                        name: 'Label 2',
                        state: 'new',
                        bool: true,
                    },
                },
            },
            changes: {},
            spaces: {},
        };
        mutations.UPDATE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update existing data 2', () => {
        state.data = {
            'Test': {
                '1': {
                    test: 'Test',
                },
            },
        };
        const action = {
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
            }
        };
        const expected = {
            actions: {},
            views: {},
            data: {
                'Test': {
                    '1': {
                        test: 'Test',
                        id: 1,
                        name: 'Label',
                        state: 'new',
                        bool: true,
                    },
                },
            },
            changes: {},
            spaces: {},
        };
        mutations.UPDATE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update multi data', () => {
        const action = {
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
                '2': {
                    id: 2,
                    name: 'Label 2',
                    state: 'new',
                    bool: true,
                },
            }
        };
        const expected = {
            actions: {},
            views: {},
            data: {
                'Test': {
                    '1': {
                        id: 1,
                        name: 'Label',
                        state: 'new',
                        bool: true,
                    },
                    '2': {
                        id: 2,
                        name: 'Label 2',
                        state: 'new',
                        bool: true,
                    },
                },
            },
            changes: {},
            spaces: {},
        };
        mutations.UPDATE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('delete existing data', () => {
        state.data = {
            'Test': {
                '1': {
                    test: 'Test',
                },
            },
        };
        const action = {
            model: 'Test',
            dataIds: ['1'],
        };
        const expected = {
            actions: {},
            views: {},
            data: {Test: {}},
            changes: {},
            spaces: {},
        };
        mutations.DELETE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('delete existing data 2', () => {
        state.data = {
            'Test': {
                '1': {
                    test: 'Test 1',
                },
                '2': {
                    test: 'Test 2',
                },
            },
        };
        const action = {
            model: 'Test',
            dataIds: ['1'],
        };
        const expected = {
            actions: {},
            views: {},
            data: {Test: {'2': {test: 'Test 2'}}},
            changes: {},
            spaces: {},
        };
        mutations.DELETE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('delete existing data 3', () => {
        state.data = {
            'Test': {
                '1': {
                    test: 'Test 1',
                },
                '2': {
                    test: 'Test 2',
                },
            },
        };
        const action = {
            model: 'Test',
            dataIds: ['1', '2'],
        };
        const expected = {
            actions: {},
            views: {},
            data: {Test: {}},
            changes: {},
            spaces: {},
        };
        mutations.DELETE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('delete existing data 4', () => {
        const action = {
            model: 'Test',
            dataIds: ['1', '2'],
        };
        const expected = {
            actions: {},
            views: {},
            data: {},
            changes: {},
            spaces: {},
        };
        mutations.DELETE_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting change 1', () => {
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test 1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': {
                        test: 'Test 1',
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting changes 2', () => {
        state.changes = {
            'Test': {
                '2': {
                    test: 'Test 2',
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test 1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': {
                        test: 'Test 1',
                    },
                    '2': {
                        test: 'Test 2',
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update existing changes 3', () => {
        state.changes = {
            'Test': {
                '1': {
                    field: 'Test 2',
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test 1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': {
                        test: 'Test 1',
                        field: 'Test 2',
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('replace unexisting change 1', () => {
        const action = {
            changes: {test: 1},
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                test: 1
            },
            data: {},
            spaces: {},
        };
        mutations.REPLACE_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('replace unexisting change 2', () => {
        state.changes = {fieldname: 'Test'}
        const action = {
            changes: {test: 1},
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                test: 1
            },
            data: {},
            spaces: {},
        };
        mutations.REPLACE_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear changes 1', () => {
        const action = {};
        const expected = {
            actions: {},
            views: {},
            data: {},
            changes: {},
            spaces: {},
        };
        mutations.CLEAR_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear changes 2', () => {
        state.changes = {
            'Test': {
                '1': {
                    test: 'Test 1',
                },
                '2': {
                    test: 'Test 2',
                },
            },
            'Other': {
                '1': {
                    test: 'Test 1',
                },
                '2': {
                    test: 'Test 2',
                },
            },
        };
        const action = {};
        const expected = {
            actions: {},
            views: {},
            data: {},
            changes: {},
            spaces: {},
        };
        mutations.CLEAR_CHANGE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('create x2M unexisting change 1', () => {
        const action = {
            model: 'Test',
            dataId: '1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                new: {
                    'Test': {
                        '1': {
                        },
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.CREATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('create x2M unexisting changes 2', () => {
        state.changes = {
            'Test': {
                '2': {
                    test: 'Test 2',
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '2': {
                        test: 'Test 2',
                    },
                },
                new: {
                    'Test': {
                        '1': {
                        },
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.CREATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('create x2m existing changes 3', () => {
        state.changes = {
            new: {
                'Test': {
                    '1': {
                        field: 'Test 2',
                    },
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                new: {
                    'Test': {
                        '1': {
                            field: 'Test 2',
                        },
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.CREATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2M unexisting change 1', () => {
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': {
                        test: 'Test',
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2M unexisting changes 2', () => {
        state.changes = {
            new: {
                'Test': {
                    '1': {
                    },
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                new: {
                    'Test': {
                        '1': {
                            test: 'Test',
                        },
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2m existing changes 3', () => {
        state.changes = {
            new: {
                'Test': {
                    '1': {
                        field: 'Test 2',
                    },
                },
            },
        };
        const action = {
            model: 'Test',
            dataId: '1',
            fieldname: 'test',
            value: 'Test',
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                new: {
                    'Test': {
                        '1': {
                            field: 'Test 2',
                            test: 'Test',
                        },
                    },
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2M delete unexisting change 1', () => {
        const action = {
            model: 'Test',
            dataIds: ['1'],
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': 'DELETED'
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M_DELETE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2M delete unexisting changes 2', () => {
        state.changes = {
            new: {
                'Test': {
                    '1': {
                    },
                    '2': {
                    },
                },
            },
        };
        const action = {
            model: 'Test',
            dataIds: ['1', '2', '3'],
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                new: {
                    'Test': {},
                },
                'Test': {
                    '3': 'DELETED',
                },
            },
            data: {},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M_DELETE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update x2m existing changes 3', () => {
        state.changes = {
            'Test': {
                '1': {
                    field: 'Test 2',
                },
            },
        };
        state.data = {
            'Test': {
                '1': {
                    other: 'Test',
                },
            },
        };
        const action = {
            model: 'Test',
            dataIds: ['1'],
        };
        const expected = {
            actions: {},
            views: {},
            changes: {
                'Test': {
                    '1': 'DELETED'
                },
            },
            data: {'Test': {}},
            spaces: {},
        };
        mutations.UPDATE_CHANGE_X2M_DELETE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear data 1', () => {
        const action = {};
        const expected = {
            actions: {},
            views: {},
            changes: {},
            data: {},
            spaces: {},
        };
        mutations.CLEAR_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear data 2', () => {
        state = {
            actions: {
                '1': {
                    label: 'Action : 1',
                    views: [
                        {
                            viewId: '1',
                            type: 'List',
                        },
                        {
                            viewId: '2',
                            type: 'Thumbnail',
                        },
                        {
                            viewId: '3',
                            type: 'Form',
                            unclickable: true,
                        },
                    ],
                }
            },
            views: {
                '1': {
                    viewType: 'List',
                    label: 'View : 1',
                    creatable: true,
                    deletable: true,
                    selectable: true,
                    onSelect: '3',
                    model: 'Test',
                    headers: [
                        {
                            name: 'id',
                            label: 'ID',
                            numeric: true,
                            component: 'furet-ui-list-field-integer',
                        },
                        {
                            name: 'name',
                            label: 'Label',
                            sortable: true,
                            component: 'furet-ui-list-field-string',
                        },
                        {
                            name: 'bool',
                            label: 'Boolean',
                            component: 'furet-ui-list-field-boolean',
                        },
                        {
                            name: 'state',
                            label: 'State',
                            selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
                            component: 'furet-ui-list-field-selection',
                        },
                    ],
                    search: [],
                    buttons: [],
                    onSelect_buttons: [],
                    fields: ["id", "name", "bool", "state"],
                },
            },
            data: {
                'Test': {
                    '1': {
                        test: 'Test 1',
                    },
                    '2': {
                        test: 'Test 2',
                    },
                },
            },
            changes: {
                new: {
                    'Test': {
                        '1': {
                            test: 'Test 1',
                        },
                        '2': {
                            test: 'Test 2',
                        },
                    },
                },
                'Test': {
                    '1': {
                        test: 'Test 1',
                    },
                    '2': {
                        test: 'Test 2',
                    },
                },
            },
            spaces: {
                '1': {
                    left_menu: menus,
                    right_menu: menus,
                },
            },
        }
        const action = {};
        const expected = {
            actions: {},
            views: {},
            changes: {},
            data: {},
            spaces: {},
        };
        mutations.CLEAR_DATA(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update unexisting space', () => {
        const action = {
            'spaceId': '1',
            'left_menu': menus,
            'right_menu': menus,
        };
        const expected = {
            actions: {},
            views: {},
            data: {},
            changes: {},
            spaces: {
                '1': {
                    left_menu: menus,
                    right_menu: menus,
                },
            },
        }
        mutations.UPDATE_SPACE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update existing space', () => {
        state.spaces = {
            '1': {
                left_menu: [],
                right_menu: [],
            },
        };
        const action = {
            'spaceId': '1',
            'right_menu': menus,
        };
        const expected = {
            actions: {},
            views: {},
            data: {},
            changes: {},
            spaces: {
                '1': {
                    left_menu: [],
                    right_menu: menus,
                },
            },
        }
        mutations.UPDATE_SPACE(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
});
