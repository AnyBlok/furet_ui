const defaultState = {}

export const views = (state = defaultState, view) => {
    const value = Object.assign({}, view);
    delete value.type;
    switch (view.type) {
        case 'UPDATE_VIEW':
            delete value.viewId;
            const values = {};
            values[view.viewId] = Object.assign({}, state[view.viewId], value);
            return Object.assign({}, state, values);
        case 'CLEAR_ACTION':
            return defaultState;
        default:
            return state
    }
}

export default views;
