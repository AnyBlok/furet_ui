import React from 'react';
import plugin from '../plugin';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class SelectionList extends React.Component {
    render () {
        return (
            <span>{this.props.selections[this.props.value] || ''}</span>
        );
    }
}


class SelectionThumbnail extends React.Component {
    render () {
        return (
            <SelectField
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            >
                {_.map(JSON.parse(this.props.selections || '[]'), s => (
                    <MenuItem key={s[0]} value={s[0]} primaryText={s[1]} />
                ))}
            </SelectField>
        );
    }
}


class SelectionForm extends React.Component {
    render () {
        const required= Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        return (
            <SelectField
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={required}
                value={this.props.value}
                onChange={(e, key, payload) => this.props.onChange(this.props.name, payload)}
            >
                {_.map(JSON.parse(this.props.selections || '[]'), s => (
                    <MenuItem key={s[0]} value={s[0]} primaryText={s[1]} />
                ))}
            </SelectField>
        );
    }
}

plugin.set(['field', 'List'], {'Selection': SelectionList});
plugin.set(['field', 'Thumbnail'], {'Selection': SelectionThumbnail});
plugin.set(['field', 'Form'], {'Selection': SelectionForm});

export default {
    SelectionList,
    SelectionThumbnail,
    SelectionForm,
}
