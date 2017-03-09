/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import {BaseList, BaseThumbnail, BaseForm} from './base';

export class URLList extends BaseList {
    getInput () {
        return (
            <a href={this.value}>{this.value}</a>
        );
    }
}

export class URLThumbnail extends BaseThumbnail {
    getInput () {
        return (
            <div>
                <a href={this.value}>{this.value}</a>
            </div>
        );
    }
}
export class URLForm extends BaseForm {
    updateThisData () {
        super.updateThisData();
        if (!this.error) {
            const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            if (!reg.test(this.value)) this.error = 'It is not an url';
        }
    }
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        return props;
    }
    getInput () {
        return (
            <div className="input-group">
                {super.getInput()}
                <span className="input-group-addon">
                    <a href={this.value}>
                        <i className='fa fa-external-link fa-lg' />
                    </a>
                </span>
            </div>
        )
    }
}

plugin.set(['field', 'List'], {'URL': URLList});
plugin.set(['field', 'Thumbnail'], {'URL': URLThumbnail});
plugin.set(['field', 'Form'], {'URL': URLForm});

export default {
    URLList,
    URLThumbnail,
    URLForm,
}
