import _ from 'underscore';
import global from './global';
import client from './client';
import rightmenu from './right-menu';
import leftmenu from './left-menu';
import spaces from './spaces';
import {action_manager} from './action_manager';
import actions from './actions';
import views from './views';
import data from './data';


export const dispatchAll = (dispatch, datas) => {
    _.each(datas, data => {
        if (data.type) dispatch(data);
    });
}

export default {
    global,
    client,
    rightmenu,
    leftmenu,
    spaces,
    action_manager,
    actions,
    views,
    data,
}
