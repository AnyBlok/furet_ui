const defaultSpace = {
    title: '',
    left_menu: [],
    right_menu: [],
    menuId: '',
    actionId: '',
    custom_view: '',
}

export const spaces = (state = {}, action) => {
    const value = Object.assign({}, action);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_SPACE':
            delete value.spaceId;
            const values = {};
            values[action.spaceId] = Object.assign({}, state[action.spaceId] || defaultSpace, value)
            return Object.assign({}, state, values);
        case 'CLEAR_SPACE':
            return {};
        default:
            return state
    }
}

export default spaces;
