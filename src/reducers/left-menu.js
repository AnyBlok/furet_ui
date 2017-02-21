const defaultState = {
    value: {label: '', image: {type: '', value: ''}},
    values: [],
}

export const lefttmenu = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_LEFT_MENU':
            return Object.assign({}, state, value);
        case 'CLEAR_LEFT_MENU':
            return defaultState;
        default:
            return state
    }
}

export default lefttmenu;
