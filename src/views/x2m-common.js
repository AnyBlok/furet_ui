/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {getNewID} from '../view';
import _ from 'underscore';
import {json_post_dispatch_all} from '../server-call';

export const X2MViewMixin = {
}

export const addNewX2MMulti = (obj) => {
    if (obj.view.onSelect) {
        const newId = getNewID(obj.view.model)
        const dataIds = obj.dataIds.slice(0);
        dataIds.push(newId);
        const values = {dataId: newId};
        if (obj.x2oField != undefined) values[obj.x2oField] = obj.x2oFieldId;
        obj.updateValueX2M(newId, values, true);
        obj.$emit('updateDataIds', dataIds);
        obj.$emit('changeView', obj.view.onSelect, newId);
    }
}
export const updateValueX2MMulti = (obj, dataId, values, create) => {
    if (create) obj.$store.commit('CREATE_CHANGE_X2M', {model: obj.view.model, dataId});
    _.each(_.keys(values), fieldname => {
        obj.$store.commit('UPDATE_CHANGE_X2M', {
            model: obj.view.model,
            dataId,
            fieldname,
            value: values[fieldname],
        });
    });
};

export const X2MViewMultiMixin = {
    mixins: [X2MViewMixin],
    props: ['model', 'views', 'viewId', 'view', 'dataIds', 'dataId', 'data', 'change', 'isReadonly', 'x2oField', 'x2oFieldId'],
    created () {
        const changes = this.$store.state.data.changes.new || {};
        const newIds = _.keys(changes[this.model] || {});
        json_post_dispatch_all('/list/x2m/get', {model: this.model, fields: this.view.fields, dataIds: _.filter(this.dataIds, dataId => newIds.indexOf(dataId) == -1)});
    },
    methods: {
        addNew () {
            addNewX2MMulti(this);
        },
        changeView(viewId) {
            this.$emit('changeView', viewId);
        },
        updateValueX2M(dataId, values, create) {
            updateValueX2MMulti(this, dataId, values, create);
        },
        selectEntry (entry) {
            if (this.view.onSelect) {
                this.$emit('changeView', this.view.onSelect, entry.__dataId);
            }
        },
    },
}
