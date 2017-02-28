import React from 'react';
import plugin from '../plugin';
import TextField from 'material-ui/TextField';

export class StringList extends React.Component {
    render () {
        return (
            <span>{this.props.value}</span>
        );
    }
}

export class StringThumbnail extends React.Component {
    render () {
        return (
            <TextField
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            />
        );
    }
}

export class StringForm extends React.Component {
    render () {
        const required= Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        return (
            <TextField
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={this.required}
                required={Boolean(eval(this.props.required))}
                value={this.props.value}
                onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                errorText={error}
            />
        );
    }
}

plugin.set(['field', 'List'], {'String': StringList});
plugin.set(['field', 'Thumbnail'], {'String': StringThumbnail});
plugin.set(['field', 'Form'], {'String': StringForm});

export class UStringList extends StringList {}
export class UStringThumbnail extends StringThumbnail {}
export class UStringForm extends StringForm {}

plugin.set(['field', 'List'], {'uString': UStringList});
plugin.set(['field', 'Thumbnail'], {'uString': UStringThumbnail});
plugin.set(['field', 'Form'], {'uString': UStringForm});

export default {
    StringList,
    StringThumbnail,
    StringForm,
    UStringList,
    UStringThumbnail,
    UStringForm,
}
