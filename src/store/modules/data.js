/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from "vue";
import _ from 'underscore';

export const pk2string = (pk) => {
    const keys = _.sortBy(_.keys(pk));
    const res = [];
    keys.forEach(key => {
        if (key !== '__x2m_state') res.push([key, pk[key]]);
    });
    return JSON.stringify(res)
}

export const update_change_object = (state_changes, action) => {
  const changes = Object.assign({}, state_changes);
  if (action.merge !== undefined) {
    _.each(_.keys(action.merge), model => {
      if (changes[model] === undefined) changes[model] = {};
      _.each(_.keys(action.merge[model]), pk => {
        if (changes[model][pk] === undefined) changes[model][pk] = {}
        if (pk === 'new') {
          if (changes[model].new === undefined) changes[model].new = {}
          _.each(_.keys(action.merge[model].new), uuid => {
            if (changes[model].new[uuid] === undefined) changes[model].new[uuid] = {};
            if (action.merge[model].new[uuid].__revert === true) changes[model].new[uuid] = {};
            Object.assign(changes[model].new[uuid], action.merge[model].new[uuid]);
          });
        } else {
          if (action.merge[model][pk].__revert === true) changes[model][pk] = {};
          Object.assign(changes[model][pk], action.merge[model][pk])
        }
      });
    })
  }
  if (changes[action.model] == undefined) changes[action.model] = {}
  let ref_key = null;
  if (action.uuid != null) {
    if (changes[action.model].new == undefined) changes[action.model].new = {};
    if (changes[action.model].new[action.uuid] == undefined)
      changes[action.model].new[action.uuid] = {};
    ref_key = changes[action.model].new[action.uuid];
  } else {
    const pk = pk2string(action.pk);
    if (changes[action.model][pk] == undefined) changes[action.model][pk] = {};
    ref_key = changes[action.model][pk];
  }
  if (Array.isArray(ref_key[action.fieldname]) && Array.isArray(action.value)) {
    _.each(action.value, val => {
      const copy_val =  Object.assign({}, val);
      delete copy_val.__revert;
      delete copy_val.__x2m_state;
      const res = ref_key[action.fieldname].filter(v => _.isMatch(v, copy_val));
      const index = ref_key[action.fieldname].indexOf(res[0]);
      if(res.length === 1 && index > -1){
        ref_key[action.fieldname][index] = Object.assign(
            ref_key[action.fieldname][index], val
        );
      } else {
        ref_key[action.fieldname].push(val);
      }
    });

    ref_key[action.fieldname] = ref_key[action.fieldname].filter(
      element => element.__revert !== true
    );
  } else {
    ref_key[action.fieldname] = action.value;
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
    const change = {};
    if ((state.changes[model] || {})[key]) {
      if (state.changes[model][key].__revert !== true || Object.keys(state.changes[model][key]).length > 1){
        Object.assign(change, {__change_state: "update"}, state.changes[model][key]);
      }
    } 
    return Object.assign({}, data, change);
  },
  get_new_entry: (state) => (model, uuid) => {
    const change = ((state.changes[model] || {}).new || {})[uuid] || {};
    if (change.__revert !== true || Object.keys(change).length > 1){
      return Object.assign({__uuid: uuid, __change_state: "create"}, change);
    } else {
      return {};
    }
  },
  get_new_entries: (state) => (model) => {
    const res = [];
    Object.entries((state.changes[model] || {}).new || {}).forEach(
      ([uuid, entry]) => {
        if (entry.__revert !== true || Object.keys(entry).length > 1){
          res.push(
            Object.assign({}, entry, {
              __uuid: uuid,
              __change_state: "create"
            })
          );
        }
      }
    );
    return res;
  }
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
        const pks = pk2string(action.pks);
        if (state.data[action.model]){
            Vue.delete(state.data[action.model], pks);
        }
    },
    'UPDATE_CHANGE'(state, action) {
        state.changes = update_change_object(state.changes, action)
    },
    'CLEAR_CHANGE'(state) {
        state.changes = {};
    },
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
