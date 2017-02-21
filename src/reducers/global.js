const defaultState = {
    title: '',
    custom_view: '',
    modal_custom_view: '',
    spaceId: '',
}

export const global = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_GLOBAL':
            const _state = Object.assign({}, defaultState);
            delete _state.title;
            if (action.custom_view || action.spaceId) return Object.assign({}, _state, value);
            if (action.modal_custom_view) return Object.assign({}, state, value);
            return state;
        case 'CLEAR_GLOBAL':
            return defaultState;
        default:
            return state
    }
}

export default global;
