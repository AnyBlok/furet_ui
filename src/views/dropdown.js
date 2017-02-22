import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    handleTouchTap (event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }
    handleRequestClose () {
        this.setState({open: false});
    }
    callAction (buttonId) {
        console.log('callAction', this.props.label, buttonId, this.props.selectedIds) 
        this.handleRequestClose();
    }
    render() {
        return (
            <div>
                <RaisedButton
                    fullWidth={true}
                    onClick={this.handleTouchTap.bind(this)}
                    label={this.props.label}
                    style={{
                        marginTop: 10,
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        {_.map(this.props.menus, menu => (
                            <MenuItem 
                                key={menu.buttonId}
                                primaryText={menu.label} 
                                onClick={() => {this.callAction(menu.buttonId)}}
                            />
                        ))}
                    </Menu>
                </Popover>
            </div>
        );
    }
}

