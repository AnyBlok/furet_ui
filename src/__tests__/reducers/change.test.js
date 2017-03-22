/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import reducer, {defaultState, current2Sync, toSync2computed, changeState, removeUuid, remove2Sync} from '../../reducers/change';

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
                type: 'CREATE',
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
                type: 'UPDATE',
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
                type: 'CREATE',
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
                type: 'UPDATE',
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
                type: 'UPDATE',
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test',
                dataId: 'new-2',
                type: 'CREATE',
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
                type: 'UPDATE',
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test2',
                dataId: 'new-2',
                type: 'CREATE',
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
                        type: 'UPDATE',
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
                        type: 'UPDATE',
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test',
                        dataId: '2',
                        type: 'CREATE',
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
                        type: 'UPDATE',
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test2',
                        dataId: '2',
                        type: 'CREATE',
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
                        type: 'CREATE',
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
                        type: 'CREATE',
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
                        type: 'UPDATE',
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test2',
                        dataId: 'new-2',
                        type: 'CREATE',
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

test('changeState with one value', () => {
    const toSync = [
        {
            uuid: 'uuid',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(changeState(toSync, 'uuid', 'Sent')).to.deep.equal([
        {
            uuid: 'uuid',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
});

test('changeState with two value', () => {
    const toSync = [
        {
            uuid: 'uuid1',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(changeState(toSync, 'uuid1', 'Sent')).to.deep.equal([
        {
            uuid: 'uuid1',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
});

test('changeState with two value 2', () => {
    const toSync = [
        {
            uuid: 'uuid1',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(changeState(toSync, 'uuid2', 'Sent')).to.deep.equal([
        {
            uuid: 'uuid1',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
});
test('reducer SYNC', () => {
    const toSync = [
        {
            uuid: 'uuid',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    const result = reducer({current: {}, computed: {}, toSync}, {type: 'SYNC', uuid: 'uuid'});
    chai.expect(result.toSync).to.deep.equal([
        {
            uuid: 'uuid',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
});
test('reducer UNSYNC', () => {
    const toSync = [
        {
            uuid: 'uuid',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    const result = reducer({current: {}, computed: {}, toSync}, {type: 'UNSYNC', uuid: 'uuid'});
    chai.expect(result.toSync).to.deep.equal([
        {
            uuid: 'uuid',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
});
test('removeUuid one element', () => {
    const toSync = [
        {
            uuid: 'uuid',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(removeUuid(toSync, 'uuid')).to.deep.equal([]);
})
test('removeUuid two elements', () => {
    const toSync = [
        {
            uuid: 'uuid1',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(removeUuid(toSync, 'uuid1')).to.deep.equal([
        {
            uuid: 'uuid2',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
})
test('removeUuid two elements 2', () => {
    const toSync = [
        {
            uuid: 'uuid1',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ];
    chai.expect(removeUuid(toSync, 'uuid2')).to.deep.equal([
        {
            uuid: 'uuid1',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name',
                    },
                },
            ],
        },
    ]);
})
test('SYNCED', () => {
    const toSync = [
        {
            uuid: 'uuid1',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name 1',
                    },
                },
            ],
        },
        {
            uuid: 'uuid2',
            state: 'Sent',
            data: [
                {
                    model: 'Test',
                    dataId: '1',
                    type: 'CREATE',
                    data: {
                        name: 'Name 2',
                    },
                },
            ],
        },
    ];
    const result = reducer({current: {}, computed: {}, toSync}, {type: 'SYNCED', uuid: 'uuid1'});
    chai.expect(result).to.deep.equal({
        current: {},
        toSync: [
            {
                uuid: 'uuid2',
                state: 'Sent',
                data: [
                    {
                        model: 'Test',
                        dataId: '1',
                        type: 'CREATE',
                        data: {
                            name: 'Name 2',
                        },
                    },
                ],
            },
        ],
        computed: {
            'Test': {
                '1': {
                    name: 'Name 2',
                },
            },
        },
    });
})
test('remove2Sync', () => {
    const toSync = [];
    remove2Sync(toSync, 'uuid', 'Test', ['1', '2', '3']);
    chai.expect(toSync.length).to.equal(1)
    chai.expect(toSync).to.deep.equal([
        {
            uuid: 'uuid',
            state: 'toSend',
            data: [
                {
                    model: 'Test',
                    dataIds: ['1', '2', '3'],
                    type: 'DELETE',
                },
            ],
        },
    ])
});
test('ON_DELETE', () => {
    const toSync = [];
    const result = reducer({current: {}, computed: {}, toSync}, {type: 'ON_DELETE', uuid: 'uuid', model: 'Test', dataIds: ['1', '2']});
    chai.expect(result).to.deep.equal({
        current: {},
        toSync: [
            {
                uuid: 'uuid',
                state: 'toSend',
                data: [
                    {
                        model: 'Test',
                        dataIds: ['1', '2'],
                        type: 'DELETE',
                    },
                ],
            },
        ],
        computed: {
            'Test': {
                '1': 'DELETED',
                '2': 'DELETED',
            },
        },
    });
})
