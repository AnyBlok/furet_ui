/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState} from '../../reducers/data';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});
test('multi action 1', () => {
    const expected = Object.assign({}, defaultState, {'Model': {'1': {id: '1', title: 'Test'}}});
    chai.expect(reducer(
        defaultState, 
        {type: 'UPDATE_DATA', model: 'Model', data: {'1': {id: '1', title: 'Test'}}}
    )).to.deep.equal(expected);
});
test('multi action 2', () => {
    const expected = Object.assign({}, defaultState, {'Model': {'1': {id: '1', other: 'Test', title: 'Test'}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {'Model': {'1': {id: '1', title: 'Test'}}}),
        {type: 'UPDATE_DATA', model: 'Model', data: {'1': {id: '1', other: 'Test'}}}
    )).to.deep.equal(expected);
});
test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {title: 'Test'}),
        {type: 'CLEAR_DATA'}
    )).to.deep.equal(defaultState);
});
test('delete data clear data', () => {
    const state = {
        'Model': {
            '1': {
                name: 'Name 1',
                title: 'Title 2',
            },
        },
    }
    const action = {
        type: 'DELETE_DATA',
        data: {
            'Model': ['1'],
        },
    }
    const expected = {};
    chai.expect(reducer(state, action)).to.deep.equal(expected);
})
test('delete data clear data in multi value', () => {
    const state = {
        'Model': {
            '1': {
                name: 'Name 1',
                title: 'Title 2',
            },
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    const action = {
        type: 'DELETE_DATA',
        data: {
            'Model': ['1'],
        },
    }
    const expected = {
        'Model': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    };
    chai.expect(reducer(state, action)).to.deep.equal(expected);
})
test('delete data clear data in multi value', () => {
    const state = {
        'Model': {
            '1': {
                name: 'Name 1',
                title: 'Title 2',
            },
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    const action = {
        type: 'DELETE_DATA',
        data: {
            'Model': ['1', '2'],
        },
    }
    const expected = {};
    chai.expect(reducer(state, action)).to.deep.equal(expected);
})
test('delete data clear data in multi value 2', () => {
    const state = {
        'Model': {
            '1': {
                name: 'Name 1',
                title: 'Title 2',
            },
        },
        'Model2': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    const action = {
        type: 'DELETE_DATA',
        data: {
            'Model': ['1'],
        },
    }
    const expected = {
        'Model2': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    };
    chai.expect(reducer(state, action)).to.deep.equal(expected);
})
test('delete data clear data in multi value 3', () => {
    const state = {
        'Model2': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    const action = {
        type: 'DELETE_DATA',
        data: {
            'Model': ['1'],
        },
    }
    const expected = {
        'Model2': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    };
    chai.expect(reducer(state, action)).to.deep.equal(expected);
})
