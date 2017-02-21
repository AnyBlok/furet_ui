const defaultState = {}

export const actions = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_ACTION_SELECT_VIEW':
            delete value.actionId;
            const values = {};
            values[action.actionId] = Object.assign({}, state[action.actionId], value);
            return Object.assign({}, state, values);
        case 'CLEAR_ACTION':
            return defaultState;
        default:
            return state
    }
}

export default actions;
