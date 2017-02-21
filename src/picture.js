import React from 'react';
import * as SvgIcon from 'material-ui/svg-icons';

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
        return (
            <div>
                Plop
            </div>
        );
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
