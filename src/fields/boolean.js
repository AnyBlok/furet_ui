/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import Checkbox from 'material-ui/Checkbox';
import {indigo500} from 'material-ui/styles/colors';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Location from 'material-ui/svg-icons/communication/location-on';
import LocationOff from 'material-ui/svg-icons/communication/location-off';
import Mic from 'material-ui/svg-icons/av/mic';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import Star from 'material-ui/svg-icons/toggle/star';
import StarOff from 'material-ui/svg-icons/toggle/star-border';

class BooleanBase extends React.Component {
    getPropsIcon (props) {
        switch (this.props.icon) {
            case 'favorite':
                props.checkedIcon = <ActionFavorite />;
                props.uncheckedIcon = <ActionFavoriteBorder />;
                break;
            case 'visibility':
                props.checkedIcon = <Visibility />;
                props.uncheckedIcon = <VisibilityOff />;
                break;
            case 'location':
                props.checkedIcon = <Location />;
                props.uncheckedIcon = <LocationOff />;
                break;
            case 'mic':
                props.checkedIcon = <Mic />;
                props.uncheckedIcon = <MicOff />;
                break;
            case 'star':
                props.checkedIcon = <Star />;
                props.uncheckedIcon = <StarOff />;
                break;
        }
    }
    getPropsPosition (props) {
        switch (this.props.labelPosition) {
            case 'left':
                props.labelPosition = 'left';
                break;
            default:
                props.labelPosition = 'right';
        }
    }
    getProps () {
        const props = {
            checked: this.props.value,
            onCheck: (e, isInputChecked) => {this.props.onChange(this.props.name, isInputChecked)},
        };
        this.getPropsIcon(props);
        return props;
    }
    render () {
        const props = this.getProps();
        return <Checkbox {...props} />
    }
}

export class BooleanList extends BooleanBase {
    getProps () {
        const props = super.getProps();
        props.disabled = true;
        return props;
    }
}

export class BooleanThumbnail extends BooleanBase {
    getProps () {
        const props = super.getProps();
        props.disabled = true;
        props.label = this.props.label;
        this.getPropsPosition(props);
        return props;
    }
}

export class BooleanForm extends BooleanBase {
    getProps () {
        const props = super.getProps();
        props.disabled = this.props.readonly;
        props.label = this.props.label;
        this.getPropsPosition(props);
        return props;
    }
}

plugin.set(['field', 'List'], {'Boolean': BooleanList});
plugin.set(['field', 'Thumbnail'], {'Boolean': BooleanThumbnail});
plugin.set(['field', 'Form'], {'Boolean': BooleanForm});

export default {
    BooleanList,
    BooleanThumbnail,
    BooleanForm,
}
