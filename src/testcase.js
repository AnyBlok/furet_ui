import _ from 'underscore';
import {jsdom} from 'jsdom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const exposedProperties = ['window', 'navigator', 'document'];

export const updateGlobal = () => {
    global.navigator = global.navigator || {};
    global.navigator.userAgent = 'node.js';
    global._ = _;

    // setup the simplest document possible
    const doc = jsdom('<!doctype html><html><body></body></html>')

    // get the window object out of the document
    const win = doc.defaultView

    // set globals for mocha that make access to document and window feel
    // natural in the test environment
    global.document = doc
    global.window = win

    Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
            exposedProperties.push(property);
            global[property] = document.defaultView[property];
        }
    });
}

export default {
    updateGlobal,
}
