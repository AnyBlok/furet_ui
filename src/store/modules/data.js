/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';

export const defaultSpace = {
    left_menu: [],
    right_menu: [],
};

export const defaultState = {
    actions: {},
    views: {},
    data: {},
    changes: {},
    spaces: {},
}

// getters
export const getters = {
};

// actions
export const actions = {
};

// mutations
export const mutations = {
    'UPDATE_ACTION'(state, action) {
        const value = Object.assign({}, action);
        delete value.actionId;
        const actions = Object.assign({}, state.actions)
        actions[action.actionId] = value;
        state.actions = actions;
    },
    'UPDATE_VIEW'(state, action) {
        const value = Object.assign({}, action);
        delete value.viewId;
        const views = Object.assign({}, state.views)
        if (views[action.viewId] == undefined) views[action.viewId] = {};
        Object.assign(views[action.viewId], value);
        state.views = views;
    },
    'UPDATE_DATA'(state, action) {
        const data = Object.assign({}, state.data)
        if (data[action.model] == undefined) data[action.model] = {};
        _.each(_.keys(action.data), dataId => {
            data[action.model][dataId] = Object.assign({}, data[action.model][dataId], action.data[dataId]);
        });
        state.data = data;
    },
    'DELETE_DATA'(state, action) {
        const data = Object.assign({}, state.data)
        _.each(action.dataIds, dataId => {
            if (data[action.model] && data[action.model][dataId])
                delete data[action.model][dataId];
        });
        state.data = data;
    },
    'UPDATE_CHANGE'(state, action) {
        const changes = Object.assign({}, state.changes);
        if (changes[action.model] == undefined) changes[action.model] = {}
        if (changes[action.model][action.dataId] == undefined) changes[action.model][action.dataId] = {};
        changes[action.model][action.dataId][action.fieldname] = action.value;
        state.changes = changes
    },
    'REPLACE_CHANGE'(state, action) {
        state.changes = Object.assign({}, action.changes);
    },
    'CLEAR_CHANGE'(state, action) {
        state.changes = {};
    },
    'CREATE_CHANGE_X2M'(state, action) {
        const changes = Object.assign({}, state.changes);
        if (changes.new == undefined) changes.new = {};
        if (changes.new[action.model] == undefined) changes.new[action.model] = {};
        if (changes.new[action.model][action.dataId] == undefined) changes.new[action.model][action.dataId] = {};
        state.changes = changes;
    },
    'UPDATE_CHANGE_X2M'(state, action) {
        const changes = Object.assign({}, state.changes);
        if (changes.new && changes.new[action.model] && changes.new[action.model][action.dataId] != undefined) {
            changes.new[action.model][action.dataId][action.fieldname] = action.value;
        } else {
            if (changes[action.model] == undefined) changes[action.model] = {}
            if (changes[action.model][action.dataId] == undefined) changes[action.model][action.dataId] = {};
            changes[action.model][action.dataId][action.fieldname] = action.value;
        }
        state.changes = changes;
    },
    'UPDATE_CHANGE_X2M_DELETE'(state, action) {
        const changes = Object.assign({}, state.changes);
        const model = action.model;
        _.each(action.dataIds, dataId => {
            if (changes.new && changes.new[model] && changes.new[model][dataId] != undefined) delete changes.new[model][dataId];
            else {
                if (changes[model] == undefined) changes[model] = {};
                changes[model][dataId] = 'DELETED';
                if (state.data && state.data[model] && state.data[model][dataId] != undefined) {
                    const data = Object.assign({}, state.data);
                    delete state.data[model][dataId];
                    state.data = data;
                }
            }
        });
        state.changes = changes;
    },
    'UPDATE_SPACE'(state, action) {
        const spaces = Object.assign({}, state.spaces)
        const value = Object.assign({}, action);
        delete value.spaceId;
        if (spaces[action.spaceId] == undefined) {
            spaces[action.spaceId] = Object.assign({}, defaultSpace, value)
        } else {
            Object.assign(spaces[action.spaceId], value)
        }
        state.spaces = spaces;
    },
    'CLEAR_DATA'(state, action) {
        state.actions = {};
        state.views = {};
        state.data = {};
        state.changes = {};
        state.spaces = {};
    },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
