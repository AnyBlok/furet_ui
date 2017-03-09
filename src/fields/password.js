/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import _ from 'underscore';
import {BaseList, BaseThumbnail, BaseForm} from './base';

export class PasswordList extends BaseList {
    getInput () {
        const value = _.map(this.props.value || [], a => ('*')).join('');
        return (
            <span>{value}</span>
        );
    }
}
export class PasswordThumbnail extends BaseThumbnail {
    getInput () {
        const value = _.map(this.props.value || [], a => ('*')).join('');
        return (
            <div>
                <span>{value}</span>
            </div>
        );
    }
}
export class PasswordForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'password';
        return props;
    }
}

plugin.set(['field', 'List'], {'Password': PasswordList});
plugin.set(['field', 'Thumbnail'], {'Password': PasswordThumbnail});
plugin.set(['field', 'Form'], {'Password': PasswordForm});

export default {
    PasswordList,
    PasswordThumbnail,
    PasswordForm,
}
