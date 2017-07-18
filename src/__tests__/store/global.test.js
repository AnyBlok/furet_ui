/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {defaultState, mutations} from '../../store/modules/global';

describe('store.state.client', () => {
    let state;
    beforeEach(() => {
        state = JSON.parse(JSON.stringify(defaultState));
    });
    it('update global', () => {
        const action = {
            title: 'Test',
            modal_custom_view: 'A modal custom view',
        };
        const expected = {
            title: 'Test',
            modal_custom_view: 'A modal custom view',
            breadscrumbs: [],
        }
        mutations.UPDATE_GLOBAL(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('add in breadscrumbs 1', () => {
        const action = {
            path: '/space/1/action/2/view/3',
            label: 'Action : 2',
            changes: {Test: {'1': {fieldname: 'Test'}}},
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [
                {
                    path: '/space/1/action/2/view/3',
                    label: 'Action : 2',
                    changes: {Test: {'1': {fieldname: 'Test'}}},
                    position: 0,
                },
            ],
        }
        mutations.ADD_IN_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('add in breadscrumbs 2', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
        ]
        const action = {
            path: '/space/1/action/2/view/3',
            label: 'Action : 2',
            changes: {Test: {'1': {fieldname: 'Test'}}},
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [
                {
                    path: '/space/1/menu/1/action/1/view/3',
                    label: 'Action : 1',
                    changes: {},
                    position: 0,
                },
                {
                    path: '/space/1/action/2/view/3',
                    label: 'Action : 2',
                    changes: {Test: {'1': {fieldname: 'Test'}}},
                    position: 1,
                },
            ],
        }
        mutations.ADD_IN_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('remove from breadscrumbs 1', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
        ]
        const action = {
            position: 0
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.REMOVE_FROM_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('remove from breadscrumbs 2', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 1,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 2,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 3,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 4,
            },
        ]
        const action = {
            position: 0
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.REMOVE_FROM_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('remove from breadscrumbs 3', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 4,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 3,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 2,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 1,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
        ]
        const action = {
            position: 2
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [
                {
                    path: '/space/1/menu/1/action/1/view/3',
                    label: 'Action : 1',
                    changes: {},
                    position: 0,
                },
                {
                    path: '/space/1/menu/1/action/1/view/3',
                    label: 'Action : 1',
                    changes: {},
                    position: 1,
                },
            ],
        }
        mutations.REMOVE_FROM_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear breadscrumbs 1', () => {
        state.breadscrumbs = []
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.CLEAR_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear breadscrumbs 2', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
        ]
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.CLEAR_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear breadscrumbs 3', () => {
        state.breadscrumbs = [
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 0,
            },
            {
                path: '/space/1/menu/1/action/1/view/3',
                label: 'Action : 1',
                changes: {},
                position: 1,
            },
        ]
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.CLEAR_BREADSCRUMB(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear 1', () => {
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.CLEAR_GLOBAL(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear 2', () => {
        state = {
            title: 'Test',
            modal_custom_view: 'A modal custom view',
            breadscrumbs: [
                {
                    path: '/space/1/menu/1/action/1/view/3',
                    label: 'Action : 1',
                    changes: {},
                    position: 0,
                },
            ],
        }
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
        }
        mutations.CLEAR_GLOBAL(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
});
