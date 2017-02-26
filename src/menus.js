import React from 'react';
import { connect } from 'react-redux'
import {dispatchAll} from './reducers';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'underscore';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Picture from './picture';
import IconSearch from 'material-ui/svg-icons/action/search'
import TextField from 'material-ui/TextField';
import {json_post} from './server-call';
import translate from 'counterpart';

class BaseMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchText: '',
        };
    }
    handleOpen () {
        this.setState({open: true});
    };
    handleClose () {
        this.setState({open: false});
    };
    selectCard (card) {
        switch (card.type) {
            case 'client':
                this.props.dispatch({
                    type: 'UPDATE_GLOBAL',
                    custom_view: card.id,
                });
                break;
            case 'space':
                json_post('/space/' + card.id, {}, {
                    onSuccess: (results) => {
                        this.props.dispatchAll(results)
                    }
                });
                this.props.dispatch({
                    type: 'UPDATE_GLOBAL',
                    spaceId: card.id,
                });
                this.props.dispatch_menu({
                    value: {
                        label: card.label,
                        image: card.image,
                    },
                });
                break;
        }
        this.handleClose();
    }
    render() {
        if (!this.props.value.label) return null;
        const actions = [
            <FlatButton
                label={translate('furetUI.menus.close', {fallback: 'Close'})}
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        const re = new RegExp(this.state.searchText, 'i');
        return (
            <div>
                <FlatButton label={this.props.value.label} 
                            icon={<Picture {...this.props.value.image} style={{height:48, width: 48}} iconSize='fa-3x'/>}
                            onTouchTap={this.handleOpen.bind(this)}
                />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}
                    contentStyle={{width: '95%', maxWidth: 'none'}}
                    title={
                        <ul className="list-inline"                                         
                            style={{
                                padding: 0,
                                margin: 10,
                                border: '1px solid gray',
                                WebkitBorderRadius: '10px',
                                MozBorderRadius: '10px',
                                borderRadius: '10px',
                            }}
                        >                                                                   
                            <li>
                                <IconSearch />
                            </li>
                            <li style={{width: '88%'}}>
                                <TextField 
                                    fullWidth={true}
                                    hintText={translate('furetUI.menus.search', {fallback: 'Search ...'})}
                                    value={this.state.searchText}
                                    onChange={(e) => {this.setState({searchText: e.target.value})}}
                                />
                            </li>
                        </ul> 
                    }
                >
                    {_.map(this.props.values, group => (
                        <fieldset
                            key={group.id}
                        >
                            <legend style={{color: 'gray'}}><Picture {...group.image} iconSize='fa-lg'/>{group.label}</legend>
                            <div className="row">
                                {_.map(group.values || [], card => {
                                    const test_label = re.test(card.label),
                                          test_description = re.test(card.description);
                                    if (test_label || test_description)
                                        return (
                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                                                 key={card.id}
                                            >
                                                <Card 
                                                    onClick={() => {this.selectCard(card)}}
                                                    style={{minHeight: 120, marginBottom: 10}}
                                                >
                                                    <CardHeader
                                                        title={card.label}
                                                        subtitle={card.description}
                                                        avatar={<Picture {...card.image} style={{height: 48, width: 48}} iconSize='fa-3x'/>}
                                                    />
                                                </Card>
                                            </div>
                                        );
                                    return null;
                                })}
                            </div>
                        </fieldset>
                    ))}
                </Dialog>
            </div>
        );
    }
}

const getComponent = (key) => {
    const mapStateToProps = (state) => {
        const _state = state[key + 'menu'];
        return {
            key,
            value: _state.value,
            values: _state.values,
            url: 'appbar/' + key + '/dialog',
        }
    }
    
    const mapDispatchToProps = (dispatch, props) => {
        return {
            dispatchAll: (data) => (dispatchAll(dispatch, data)),
            dispatch: dispatch,
            dispatch_menu: (obj) => {
                dispatch(Object.assign({type: 'UPDATE_' + key.toUpperCase() + '_MENU'}, obj));
            },
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(BaseMenu);
}

export const RightMenu = getComponent('right');
export const LeftMenu = getComponent('left');

export default {
    RightMenu,
    LeftMenu,
}
