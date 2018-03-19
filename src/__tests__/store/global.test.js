/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {defaultState, mutations, actions} from '../../store/modules/global';
jest.useFakeTimers();

describe('store.state.global', () => {
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
            notifications: [],
            previous_path: '',
        }
        mutations.UPDATE_GLOBAL(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update previous path', () => {
        const action = {
            route: {
                path: '/test',
            },
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '/test',
        }
        mutations.UPDATE_PREVIOUS_PATH(state, action);
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            notifications: [],
            previous_path: '',
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
            previous_path: '',
        }
        const action = {};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        mutations.CLEAR_GLOBAL(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('ADD_NOTIFICATION 1', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        const action = {
            id: 1,
            title: 'Title 1',
            message: 'Message 1',
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [{
                id: 1,
                title: 'Title 1',
                message: 'Message 1',
            }],
            previous_path: '',
        }
        mutations.ADD_NOTIFICATION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('ADD_NOTIFICATION 2', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [{
                id: 1,
                title: 'Title 1',
                message: 'Message 1',
            }],
            previous_path: '',
        }
        const action = {
            id: 2,
            title: 'Title 2',
            message: 'Message 2',
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [
                {
                    id: 1,
                    title: 'Title 1',
                    message: 'Message 1',
                },
                {
                    id: 2,
                    title: 'Title 2',
                    message: 'Message 2',
                },
            ],
            previous_path: '',
        }
        mutations.ADD_NOTIFICATION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('REMOVE_NOTIFICATION 1', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [{
                id: 1,
                title: 'Title 1',
                message: 'Message 1',
            }],
            previous_path: '',
        }
        const action = {id: 1};
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        mutations.REMOVE_NOTIFICATION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('REMOVE_NOTIFICATION 2', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [
                {
                    id: 1,
                    title: 'Title 1',
                    message: 'Message 1',
                },
                {
                    id: 2,
                    title: 'Title 2',
                    message: 'Message 2',
                },
            ],
            previous_path: '',
        }
        const action = {
            id: 2,
            title: 'Title 2',
            message: 'Message 2',
        };
        const expected = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [
                {
                    id: 1,
                    title: 'Title 1',
                    message: 'Message 1',
                },
            ],
            previous_path: '',
        }
        mutations.REMOVE_NOTIFICATION(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('ADD_NOTIFICATION action 1', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        const action = {
            process: 'dispatch',
            title: 'Title 1',
            message: 'Message 1',
            has_icon: true,
        };
        actions.ADD_NOTIFICATION({commit: (key, a) => {mutations[key](state, a)}}, action)
        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].title).toBe('Title 1');
        expect(state.notifications[0].message).toBe('Message 1');
        expect(state.notifications[0].process).toBe(undefined);
        expect(state.notifications[0].id).toBeDefined();
        expect(state.notifications[0].has_icon).toBe(true);
    });
    it('ADD_NOTIFICATION action 2', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        const action = {
            process: 'dispatch',
        };
        actions.ADD_NOTIFICATION({commit: (key, a) => {mutations[key](state, a)}}, action)
        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].title).toBe('');
        expect(state.notifications[0].message).toBe('');
        expect(state.notifications[0].process).toBe(undefined);
        expect(state.notifications[0].id).toBeDefined();
        expect(state.notifications[0].has_icon).toBe(false);
    });
    it('ADD_NOTIFICATION action 3 (with duration)', () => {
        state = {
            title: '',
            modal_custom_view: '',
            breadscrumbs: [],
            notifications: [],
            previous_path: '',
        }
        const action = {
            process: 'dispatch',
            title: 'Title 1',
            message: 'Message 1',
            has_icon: true,
            duration: 1000,
        };
        actions.ADD_NOTIFICATION({commit: (key, a) => {mutations[key](state, a)}}, action)
        expect(state.notifications.length).toBe(1);
        expect(state.notifications[0].title).toBe('Title 1');
        expect(state.notifications[0].message).toBe('Message 1');
        expect(state.notifications[0].process).toBe(undefined);
        expect(state.notifications[0].id).toBeDefined();
        expect(state.notifications[0].has_icon).toBe(true);
        // change time to forward 1 sec
        jest.runTimersToTime(1000);
        expect(setTimeout.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1000);
        expect(state.notifications.length).toBe(0);
    });
});
