import React from 'react';
import plugin from '../plugin';
import DatePicker from 'material-ui/DatePicker';


class DateList extends React.Component {
    render () {
        try {
            const date = new Date(Date.parse(this.props.value));
            return (
                <span>{date.toLocaleDateString(this.props.locale)}</span>
            );
        } catch (e) {
            return null;
        }
    }
}

class DateThumbnail extends React.Component {
    render () {
        return (
            <DatePicker
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Date': DateList});
plugin.set(['field', 'Thumbnail'], {'Date': DateThumbnail});
