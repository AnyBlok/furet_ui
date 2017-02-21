const defaultState = {}

export const data = (state = defaultState, action) => {
    const value = Object.assign({}, action);
    const values = Object.assign({}, state);
    delete value.type;
    switch (action.type) {
        case 'UPDATE_DATA':
            delete value.model;
            if (values[action.model] == undefined) values[action.model] = {};
            if (values[action.model][action.id] == undefined) values[action.model][action.id] = {};
            Object.assign(values[action.model][action.id], value);
            return values;
        case 'UPDATE_MULTI_DATA':
            if (values[action.model] == undefined) values[action.model] = {};
            _.each(action.data, data => {
                if (values[action.model][data.id] == undefined) values[action.model][data.id] = {};
                Object.assign(values[action.model][data.id], data);
            });
            return values;
        case 'CLEAR_DATA':
            return defaultState;
        default:
            return state
    }
}

export default data;

