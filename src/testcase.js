import _ from 'underscore';

export const updateGlobal = () => {
    global.document = {
        createElement: () => {
            return {
                innerHTM: () => {},
            };
        },
        body: {
            appendChild: () => {},
        }
    };
    global.window = {
        addEventListener: () => {},
        attachEvent: () => {},
    }
    global.navigator = global.navigator || {};
    global.navigator.userAgent = 'all';
    global._ = _;
}

export default {
    updateGlobal,
}
