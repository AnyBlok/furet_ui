const defaultState = {}

export const client = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_VIEW_CLIENT':
            delete value.viewName;
            const values = {};
            values[action.viewName] = value
            return Object.assign({}, state, values);
        case 'CLEAR_CLIENT':
            return defaultState;
        default:
            return state
    }
}

export default client;

