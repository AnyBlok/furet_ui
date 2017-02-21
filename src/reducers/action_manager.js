const defaultState = {
    actions: [],
    action_data: {},
}

export const action_manager = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_ACTION_MANAGER_ADD_ACTION':
            const actions = state.actions.slice(0);
            actions.push(action.actionId);
            return Object.assign({}, state, {actions});
        case 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA':
            delete value.actionId;
            const action_data = Object.assign({}, state.action_data);
            action_data[action.actionId] = value;
            return Object.assign({}, state, {action_data});
        case 'RESET_ACTION_MANAGER':
            return Object.assign({}, state, {actions: []});
        case 'CLEAR_ACTION_MANAGER':
            return defaultState;
        default:
            return state
    }
}

export default action_manager;
