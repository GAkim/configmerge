/* eslint-disable */
const generateGetHandler = require('../Middleware/generateGetHandler');

module.exports = function proxyInstance(context) {
    const { __namespace__ } = Object.getPrototypeOf(context);
    const namespacePlugins = globalThis.plugins?.[__namespace__]?.['member-function'];
    /*
    The below 3 lines are present in core SWPWA, but they were commented out, as they caused things to occasionally
     break unpredictably.
     The issue is that in some cases, instances are created before plugins are loaded. As a result, this check fails
      and the function assumes that there are no plugins.
     */
    // if (!namespacePlugins) {
    //     return;
    // }

    return new Proxy(context, {
        get: generateGetHandler('instance', __namespace__)
    });
};
