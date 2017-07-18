/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import {defaultState, mutations} from '../../store/modules/left-menu';

describe('store.state.client', () => {
    let state;
    let expected;
    const value = {
        label: 'Space 1',
        image: {type: 'font-icon', value: 'fa-user'},
    };
    const values = [
        {
            label: 'Space groupe 1',
            image: {'type': '', 'value': ''},
            id: 1,
            values: [
                {
                    label: 'Space 1',
                    description: '',
                    image: {type: '', value: ''},
                    type: 'space',
                    id: '1',
                },
                {
                    label: 'Customer',
                    description: 'Manager customer, address and category',
                    image: {type: 'font-icon', value: 'fa-user'},
                    type: 'space',
                    id: '2',
                },
            ],
        },
    ];
    beforeEach(() => {
        state = JSON.parse(JSON.stringify(defaultState));
        expected = JSON.parse(JSON.stringify(defaultState));
    });
    it('update 1', () => {
        const action = {
            value,
        }
        expected.value = value;
        mutations.UPDATE_LEFT_MENU(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update 2', () => {
        const action = {
            values,
        }
        expected.values = values;
        mutations.UPDATE_LEFT_MENU(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('update 3', () => {
        const action = {
            value,
            values,
        }
        expected.value = value;
        expected.values = values;
        mutations.UPDATE_LEFT_MENU(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear 1', () => {
        const action = {}
        mutations.CLEAR_LEFT_MENU(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
    it('clear 2', () => {
        state.value = value;
        state.values = values;
        const action = {}
        mutations.CLEAR_LEFT_MENU(state, action);
        chai.expect(state).to.deep.equal(expected)
    });
});
