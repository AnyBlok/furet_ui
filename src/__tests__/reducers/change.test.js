/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState, current2Sync, toSync2computed} from '../../reducers/change';

test('get init value', () => {
    chai.expect(reducer(defaultState, {type: 'UNKNOWN_FOR_TEST'})).to.deep.equal(defaultState);
});
test('multi action 1', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test'}}}});
    chai.expect(reducer(
        defaultState, 
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('multi action 2', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test', other: 'Test'}}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('get clear all', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'CLEAR_CHANGE'}
    )).to.deep.equal(defaultState);
});
test('current2Sync empty', () => {
    const current = {},
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = true;

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(0);
});
test('current2Sync current new data', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name',
                        title: 'Title',
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = true;

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                newData: true,
                data: {
                    name: 'Name',
                    title: 'Title',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected);
    chai.expect(toSync[1]).to.deep.equal(expected);
});
test('current2Sync current old data', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name',
                        title: 'Title',
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = false;

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                newData: false,
                data: {
                    name: 'Name',
                    title: 'Title',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected);
    chai.expect(toSync[1]).to.deep.equal(expected);
});
test('current2Sync current with two different current', () => {
    const current1 = {
                'Test': {
                    '1': {
                        name: 'Name',
                        title: 'Title',
                    },
                },
          },
          current2 = {
                'Test': {
                    '2': {
                        name: 'Name2',
                        title: 'Title2',
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1';

    current2Sync(current1, toSync, uuid, model, dataId, true);
    chai.expect(toSync.length).to.equal(1);
    const expected1 = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                newData: true,
                data: {
                    name: 'Name',
                    title: 'Title',
                },
            },
        ],
    };
    const expected2 = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '2',
                newData: false,
                data: {
                    name: 'Name2',
                    title: 'Title2',
                },
            },
        ],
    };
    chai.expect(toSync[0]).to.deep.equal(expected1);

    current2Sync(current2, toSync, uuid, model, '2', false);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected1);
    chai.expect(toSync[1]).to.deep.equal(expected2);
});
test('current2Sync current multi data with new', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                    'new-2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = false;

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                newData: false,
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test',
                dataId: 'new-2',
                newData: true,
                data: {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);
});
test('current2Sync current multi data with new with different Model', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
                'Test2': {
                    'new-2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = false;

    current2Sync(current, toSync, uuid, model, dataId, newData);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                newData: false,
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test2',
                dataId: 'new-2',
                newData: true,
                data: {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);
});
test('toSync2computed simple', () => {
    const computed = {},
          toSync = [
            {
                uuid: 'uuid',
                state: 'toSend',
                data: [
                    {
                        model: 'Test',
                        dataId: '1',
                        newData: false,
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                ],
            }
          ];

    toSync2computed(toSync, computed);
    const expected = {
        'Test': {
            '1': {
                name: 'Name 1',
                title: 'Title 1',
            },
        },
    }
    chai.expect(computed).to.deep.equal(expected);
});
test('toSync2computed double', () => {
    const computed = {},
          toSync = [
            {
                uuid: 'uuid',
                state: 'toSend',
                data: [
                    {
                        model: 'Test',
                        dataId: '1',
                        newData: false,
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test',
                        dataId: '2',
                        newData: true,
                        data: {
                            name: 'Name 2',
                            title: 'Title 2',
                        },
                    },
                ],
            }
          ];

    toSync2computed(toSync, computed);
    const expected = {
        'Test': {
            '1': {
                name: 'Name 1',
                title: 'Title 1',
            },
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    chai.expect(computed).to.deep.equal(expected);
});
test('toSync2computed double with different model', () => {
    const computed = {},
          toSync = [
            {
                uuid: 'uuid',
                state: 'toSend',
                data: [
                    {
                        model: 'Test',
                        dataId: '1',
                        newData: false,
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test2',
                        dataId: '2',
                        newData: true,
                        data: {
                            name: 'Name 2',
                            title: 'Title 2',
                        },
                    },
                ],
            }
          ];

    toSync2computed(toSync, computed);
    const expected = {
        'Test': {
            '1': {
                name: 'Name 1',
                title: 'Title 1',
            },
        },
        'Test2': {
            '2': {
                name: 'Name 2',
                title: 'Title 2',
            },
        },
    }
    chai.expect(computed).to.deep.equal(expected);
});
test('ON_SAVE', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
                'Test2': {
                    'new-2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
          },
          toSync = [
            {
                uuid: 'uuid0',
                state: 'toSend',
                data: [
                    {
                        model: 'Test',
                        dataId: '2',
                        newData: true,
                        data: {
                            name: 'Name 2',
                            title: 'Title 2',
                        },
                    },
                ],
            }
          ],
          computed = {
            'Test': {
                '2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
          },
          action = {
              type: 'ON_SAVE',
              uuid: 'uuid',
              model: 'Test',
              dataId: '1',
              newData: false
          };
    const result = reducer({current, toSync, computed}, action);
    const expected = {
        current: {},
        toSync: [ 
            { 
                uuid: 'uuid0', 
                state: 'toSend', 
                data: [
                    {
                        model: 'Test',
                        dataId: '2',
                        newData: true,
                        data: {
                            name: 'Name 2',
                            title: 'Title 2',
                        },
                    },
                ], 
            },
            { 
                uuid: 'uuid', 
                state: 'toSend', 
                data: [
                    {
                        model: 'Test',
                        dataId: '1',
                        newData: false,
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test2',
                        dataId: 'new-2',
                        newData: true,
                        data: {
                            name: 'Name 2',
                            title: 'Title 2',
                        },
                    },
                ] 
            }, 
        ],
        computed: { 
            Test: { 
                '1': {
                    name: 'Name 1',
                    title: 'Title 1',
                }, 
                '2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
            Test2: { 
                'new-2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            }, 
        },
    };
    chai.expect(result).to.deep.equal(expected);
});
