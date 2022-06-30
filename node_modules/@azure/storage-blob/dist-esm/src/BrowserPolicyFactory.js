// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BrowserPolicy } from "./policies/BrowserPolicy";
/**
 * BrowserPolicyFactory is a factory class helping generating BrowserPolicy objects.
 *
 * @export
 * @class BrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
var BrowserPolicyFactory = /** @class */ (function () {
    function BrowserPolicyFactory() {
    }
    /**
     * Creates a BrowserPolicyFactory object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {BrowserPolicy}
     * @memberof BrowserPolicyFactory
     */
    BrowserPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new BrowserPolicy(nextPolicy, options);
    };
    return BrowserPolicyFactory;
}());
export { BrowserPolicyFactory };
//# sourceMappingURL=BrowserPolicyFactory.js.map