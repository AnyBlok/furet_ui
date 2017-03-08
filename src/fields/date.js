/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import DatePicker from 'material-ui/DatePicker';
import translate from 'counterpart';
import {indigo500} from 'material-ui/styles/colors';


class DateList extends React.Component {
    render () {
        if (this.props.value) {
            const date = new Date(Date.parse(this.props.value));
            return <span>{translate.localize(date, {type: 'date', scope: 'furetUI'})}</span>
        }
        return null;
    }
}

class DateThumbnail extends React.Component {
    render () {
        const date = this.props.value ? new Date(Date.parse(this.props.value)): null;
        return (
            <DatePicker
                id={this.props.id}
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={date}
                formatDate={(d) => translate.localize(d, {type: 'date', scope: 'furetUI'})}
                okLabel={translate('furetUI.field.date.ok', {fallback: 'Ok'})}
                cancelLabel={translate('furetUI.field.date.cancel', {fallback: 'Cancel'})}
            />
        );
    }
}

class DateForm extends React.Component {
    onChange(event, date) {
        const d = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
        this.props.onChange(this.props.name, d);
    }
    render () {
        const required = Boolean(eval(this.props.required));
        const date = this.props.value ? new Date(Date.parse(this.props.value)): null;
        const floatingLabelStyle = {};
        if (required && !this.props.readonly) floatingLabelStyle.color = indigo500;
        return (
            <DatePicker
                id={this.props.id}
                floatingLabelText={this.props.label}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={required}
                value={date}
                formatDate={(d) => translate.localize(d, {type: 'date', scope: 'furetUI'})}
                okLabel={translate('furetUI.fields.date.ok', {fallback: 'Ok'})}
                cancelLabel={translate('furetUI.fields.date.cancel', {fallback: 'Cancel'})}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Date': DateList});
plugin.set(['field', 'Thumbnail'], {'Date': DateThumbnail});
plugin.set(['field', 'Form'], {'Date': DateForm});

export default {
    DateList,
    DateThumbnail,
    DateForm,
}
