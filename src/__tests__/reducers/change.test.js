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
test('on change 1', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test'}}}});
    chai.expect(reducer(
        defaultState, 
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('on change 2', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test', other: 'Test'}}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test'}
    )).to.deep.equal(expected);
});
test('on change 3', () => {
    const fields = ['title', 'other', 'test'];
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': {title: 'Test', other: 'Test', __fields: fields}}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'ON_CHANGE', model: 'Model', dataId: '1', fieldname: 'title', newValue: 'Test', fields}
    )).to.deep.equal(expected);
});
test('on change delete 1', () => {
    const fields = ['title', 'other', 'test'];
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': 'DELETED'}}});
    chai.expect(reducer(
        defaultState,
        {type: 'ON_CHANGE_DELETE', model: 'Model', dataIds: ['1']}
    )).to.deep.equal(expected);
});
test('on change delete 2', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': 'DELETED'}}});
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'ON_CHANGE_DELETE', model: 'Model', dataIds: ['1']}
    )).to.deep.equal(expected);
});
test('on change delete 3', () => {
    const expected = Object.assign({}, defaultState, {current: {'Model': {'1': 'DELETED', '2': {other: 'Test'}, '3': 'DELETED', '4': 'DELETED'}}});
    const result = reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}, '2': {other: 'Test'}, '3': {other: 'Test'}, '4': 'DELETED'}}}),
        {type: 'ON_CHANGE_DELETE', model: 'Model', dataIds: ['1', '3']});
    chai.expect(result).to.deep.equal(expected);
});
test('get clear current', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}}),
        {type: 'CLEAR_CHANGE'}
    )).to.deep.equal(defaultState);
});
test('get all clear current', () => {
    chai.expect(reducer(
        Object.assign({}, defaultState, {current: {'Model': {'1': {other: 'Test'}}}, currents: {'ActionId': {'Model': {'2': {title: 'Test'}}}}}),
        {type: 'CLEAR_ALL_CHANGES'}
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
          newData = true,
          fields = ['name', 'title', 'id'];

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                type: 'CREATE',
                fields,
                data: {
                    name: 'Name',
                    title: 'Title',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected);
    chai.expect(toSync[1]).to.deep.equal(expected);
});
test('current2Sync current deleted data', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name',
                        title: 'Title',
                    },
                    '2': 'DELETED'
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = true,
          fields = ['name', 'title', 'id'];

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            { 
                model: 'Test',
                dataId: '1',
                type: 'CREATE',
                fields,
                data: { 
                    name: 'Name', 
                    title: 'Title' 
                }, 
            },
            {
                model: 'Test',
                dataIds: ['2'],
                type: 'DELETE',
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);
});
test('current2Sync current old data', () => {
    const fields = ['name', 'title', 'id'];
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

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                type: 'UPDATE',
                fields,
                data: {
                    name: 'Name',
                    title: 'Title',
                },
            },
        ],
    }
    chai.expect(toSync[0]).to.deep.equal(expected);

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected);
    chai.expect(toSync[1]).to.deep.equal(expected);
});
test('current2Sync current with two different current', () => {
    const fields = ['name', 'title', 'id'];
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

    current2Sync(current1, toSync, uuid, model, dataId, true, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected1 = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                type: 'CREATE',
                fields,
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
                fields,
                data: {
                    name: 'Name2',
                    title: 'Title2',
                },
            },
        ],
    };
    chai.expect(toSync[0]).to.deep.equal(expected1);

    current2Sync(current2, toSync, uuid, model, '2', false, fields);
    chai.expect(toSync.length).to.equal(2);
    chai.expect(toSync[0]).to.deep.equal(expected1);
    chai.expect(toSync[1]).to.deep.equal(expected2);
});
test('current2Sync current multi data with new', () => {
    const fields = ['name', 'title', 'id'];
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                    'new-2': {
                        name: 'Name 2',
                        title: 'Title 2',
                        __fields: fields,
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = false;

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                type: 'UPDATE',
                fields,
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test',
                dataId: 'new-2',
                type: 'CREATE',
                fields,
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
    const fields = ['name', 'title', 'id'];
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
                        __fields: fields,
                    },
                },
          },
          toSync = [],
          uuid = 'uuid',
          model = 'Test',
          dataId = '1',
          newData = false;

    current2Sync(current, toSync, uuid, model, dataId, newData, fields);
    chai.expect(toSync.length).to.equal(1);
    const expected = {
        uuid,
        state: 'toSend',
        data: [
            {
                model: 'Test',
                dataId: '1',
                type: 'UPDATE',
                fields,
                data: {
                    name: 'Name 1',
                    title: 'Title 1',
                },
            },
            {
                model: 'Test2',
                dataId: 'new-2',
                type: 'CREATE',
                fields,
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
    const fields = ['name', 'title', 'id'];
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
                        __fields: fields,
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
                        fields,
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
              newData: false,
              fields,
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
                        fields,
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
                        fields,
                        data: {
                            name: 'Name 1',
                            title: 'Title 1',
                        },
                    },
                    {
                        model: 'Test2',
                        dataId: 'new-2',
                        type: 'CREATE',
                        fields,
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

test('ADD_CURRENTS 1', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
          },
          currents = {},
          toSync = [],
          computed = {},
          action = {
              type: 'ADD_CURRENTS',
              actionId: '1',
          };
    const result = reducer({current, toSync, computed, currents}, action);
    const expected = {
        current: {},
        toSync: [],
        computed: {},
        currents: { 
            '1': {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
            }, 
        },
    };
    chai.expect(result).to.deep.equal(expected);
});

test('ADD_CURRENTS 2', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
          },
          currents = {},
          toSync = [],
          computed = {};
    const result = reducer({current, toSync, computed, currents}, {type: 'ADD_CURRENTS', actionId: '1'});
    const expected = {
        current: {},
        toSync: [],
        computed: {},
        currents: { 
            '1': {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
            }, 
        },
    };
    chai.expect(result).to.deep.equal(expected);
    const expected2 = {
        current: {},
        toSync: [],
        computed: {},
        currents: { 
            '1': {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
            }, 
            '2': {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
            }, 
        },
    };
    const result2 = reducer({current, toSync, computed, currents: result.currents}, 
                            {type: 'ADD_CURRENTS', actionId: '2'});
    chai.expect(result2).to.deep.equal(expected2);
});
test('REVERT_CHANGE 1', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
          },
          currents = {
            '1': {
                'Test': {
                    '2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
            },
          },
          toSync = [],
          computed = {};
    const result = reducer({current, toSync, computed, currents}, 
                           {type: 'REVERT_CHANGE', actionId: '1', actionIds: []});
    const expected = {
        current: {
            'Test': {
                '2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
        },
        toSync: [],
        computed: {},
        currents: {},
    };
    chai.expect(result).to.deep.equal(expected);
});
test('REVERT_CHANGE 2', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
          },
          currents = {
            '1': {
                'Test': {
                    '2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
            },
            '2': {
                'Test': {
                    '3': {
                        name: 'Name 3',
                        title: 'Title 3',
                    },
                },
            },
          },
          toSync = [],
          computed = {};
    const result = reducer({current, toSync, computed, currents}, 
                           {type: 'REVERT_CHANGE', actionId: '1', actionIds: []});
    const expected = {
        current: {
            'Test': {
                '2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
        },
        toSync: [],
        computed: {},
        currents: {
            '2': {
                'Test': {
                    '3': {
                        name: 'Name 3',
                        title: 'Title 3',
                    },
                },
            },
        },
    };
    chai.expect(result).to.deep.equal(expected);
});
test('REVERT_CHANGE 3', () => {
    const current = {
                'Test': {
                    '1': {
                        name: 'Name 1',
                        title: 'Title 1',
                    },
                },
          },
          currents = {
            '1': {
                'Test': {
                    '2': {
                        name: 'Name 2',
                        title: 'Title 2',
                    },
                },
            },
            '2': {
                'Test': {
                    '3': {
                        name: 'Name 3',
                        title: 'Title 3',
                    },
                },
            },
            '3': {
                'Test': {
                    '4': {
                        name: 'Name 4',
                        title: 'Title 4',
                    },
                },
            },
          },
          toSync = [],
          computed = {};
    const result = reducer({current, toSync, computed, currents}, 
                           {type: 'REVERT_CHANGE', actionId: '1', actionIds: [3]});
    const expected = {
        current: {
            'Test': {
                '2': {
                    name: 'Name 2',
                    title: 'Title 2',
                },
            },
        },
        toSync: [],
        computed: {},
        currents: {
            '2': {
                'Test': {
                    '3': {
                        name: 'Name 3',
                        title: 'Title 3',
                    },
                },
            },
        },
    };
    chai.expect(result).to.deep.equal(expected);
});
