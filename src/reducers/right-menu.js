const defaultState = {
    value: {label: '', image: {type: '', value: ''}},
    values: [],
}

export const rightmenu = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_RIGHT_MENU':
            return Object.assign({}, state, value);
        case 'CLEAR_RIGHT_MENU':
            return defaultState;
        default:
            return state
    }
}

export default rightmenu;
