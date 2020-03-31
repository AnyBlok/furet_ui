/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';

export const pk2string = (pk) => {
    const keys = _.sortBy(_.keys(pk));
    const res = [];
    keys.forEach(key => {
        res.push([key, pk[key]]);
    });
    return JSON.stringify(res)
}

export const update_change_object = (state_changes, action) => {
  const changes = Object.assign({}, state_changes);
  if (action.merge !== undefined) {
    _.each(_.keys(action.merge), model => {
      if (changes[model] === undefined) changes[model] = {}
      _.each(_.keys(action.merge[model]), pk => {
        if (changes[model][pk] === undefined) changes[model][pk] = {}
        Object.assign(changes[model][pk], action.merge[model][pk])
      });
    })
  }
  if (changes[action.model] == undefined) changes[action.model] = {}
  if (action.uuid != null) {
    if (changes[action.model].new == undefined) changes[action.model].new = {};
    if (changes[action.model].new[action.uuid] == undefined) changes[action.model].new[action.uuid] = {};
    changes[action.model].new[action.uuid][action.fieldname] = action.value;
  } else {
    const pk = pk2string(action.pk)
    if (changes[action.model][pk] == undefined) changes[action.model][pk] = {};
    changes[action.model][pk][action.fieldname] = action.value;
  }
  return changes
}

export const defaultState = {
    data: {},
    changes: {},
}

// getters
export const getters = {
  get_entry: (state) => (model, pk) => {
    const key = pk2string(pk)
    const data = (state.data[model] || {})[key] || {};
    const change = (state.changes[model] || {})[key] || {};
    return Object.assign({}, data, change);
  },
  get_new_entry: (state) => (model, uuid) => {
    const change = ((state.changes[model] || {}).new || {})[uuid] || {};
    return Object.assign({}, change);
  },
};

// actions
export const actions = {
};

// mutations
export const mutations = {
    'UPDATE_DATA'(state, action) {
        const data = Object.assign({}, state.data)
        if (data[action.model] == undefined) data[action.model] = {};
        const pk = pk2string(action.pk)
        data[action.model][pk] = Object.assign({}, data[action.model][pk], action.data);
        state.data = data;
    },
    'DELETE_DATA'(state, action) {
        const data = Object.assign({}, state.data)
        const pks = pk2string(action.pks)
        if (data[action.model] && data[action.model][pks])
          delete data[action.model][pks];
        state.data = data;
    },
    'UPDATE_CHANGE'(state, action) {
        state.changes = update_change_object(state.changes, action)
    },
    // 'REPLACE_CHANGE'(state, action) {
    //     state.changes = Object.assign({}, action.changes);
    // },
    'CLEAR_CHANGE'(state) {
        state.changes = {};
    },
    // 'CREATE_CHANGE_X2M'(state, action) {
    //     const changes = Object.assign({}, state.changes);
    //     if (changes.new == undefined) changes.new = {};
    //     if (changes.new[action.model] == undefined) changes.new[action.model] = {};
    //     if (changes.new[action.model][action.dataId] == undefined) changes.new[action.model][action.dataId] = {};
    //     state.changes = changes;
    // },
    // 'UPDATE_CHANGE_X2M'(state, action) {
    //     const changes = Object.assign({}, state.changes);
    //     if (changes.new && changes.new[action.model] && changes.new[action.model][action.dataId] != undefined) {
    //         changes.new[action.model][action.dataId][action.fieldname] = action.value;
    //     } else {
    //         if (changes[action.model] == undefined) changes[action.model] = {}
    //         if (changes[action.model][action.dataId] == undefined) changes[action.model][action.dataId] = {};
    //         changes[action.model][action.dataId][action.fieldname] = action.value;
    //     }
    //     state.changes = changes;
    // },
    // 'UPDATE_CHANGE_X2M_DELETE'(state, action) {
    //     const changes = Object.assign({}, state.changes);
    //     const model = action.model;
    //     _.each(action.dataIds, dataId => {
    //         if (changes.new && changes.new[model] && changes.new[model][dataId] != undefined) delete changes.new[model][dataId];
    //         else {
    //             if (changes[model] == undefined) changes[model] = {};
    //             changes[model][dataId] = 'DELETED';
    //             if (state.data && state.data[model] && state.data[model][dataId] != undefined) {
    //                 const data = Object.assign({}, state.data);
    //                 delete state.data[model][dataId];
    //                 state.data = data;
    //             }
    //         }
    //     });
    //     state.changes = changes;
    // },
    'CLEAR_DATA'(state) {
        state.data = {};
        state.changes = {};
    },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
