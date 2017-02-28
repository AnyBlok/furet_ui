/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import * as SvgIcon from 'material-ui/svg-icons';

/**
    Picture class

    Render a picture with source come from (type):
    * font-icon: font awesome class
    * svg-icon: Icon from material design icons <https://material.io/icons/>

    import Picture from './picture'

    <Picture type="font-icon" value="fa-user" iconSize="fa-3x" />
    or
    <Picture type="svg-icon" value="ActionAndroid" style={{height: 48, width: 48}} />
**/
class Picture extends React.Component {
    render () {
        switch (this.props.type) {
            case 'font-icon':
                return (
                    <i className={"fa " + this.props.value + ' ' + this.props.iconSize} 
                       style={this.props.style}
                    /> 
                );
            case 'svg-icon':
                return React.createElement(SvgIcon[this.props.value], {style: this.props.style});
            default:
                return null
        }
    }
}

Picture.propTypes = {
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
};

Picture.defaultProps = {
    style: {},
    iconSize: ''
};

export default Picture;
