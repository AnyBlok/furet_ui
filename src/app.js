import React from 'react';
import {connect} from 'react-redux'
import {RightMenu, LeftMenu} from './menus';
import AppBar from 'material-ui/AppBar';
import {getClientView} from './views';
import Space from './space';


class App extends React.Component {
    getEntryPointApp () {
        const res = [];
        if (this.props.spaceId) {
            res.push(<Space key={'space-' + this.props.spaceId} spaceId={this.props.spaceId} />);
        }
        if (this.props.custom_view) {
            res.push(getClientView(this.props.custom_view));
        }
        return res;
    }
    render () {
        return (
            <div>
                <AppBar
                    title={this.props.title}
                    iconElementLeft={<LeftMenu />}
                    iconElementRight={<RightMenu />}
                />
                {this.getEntryPointApp()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.global;
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
