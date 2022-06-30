// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { UniqueRequestIDPolicy } from "./policies/UniqueRequestIDPolicy";
/**
 * UniqueRequestIDPolicyFactory is a factory class helping generating UniqueRequestIDPolicy objects.
 *
 * @export
 * @class UniqueRequestIDPolicyFactory
 * @implements {RequestPolicyFactory}
 */
var UniqueRequestIDPolicyFactory = /** @class */ (function () {
    function UniqueRequestIDPolicyFactory() {
    }
    /**
     * Creates a UniqueRequestIDPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {UniqueRequestIDPolicy}
     * @memberof UniqueRequestIDPolicyFactory
     */
    UniqueRequestIDPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new UniqueRequestIDPolicy(nextPolicy, options);
    };
    return UniqueRequestIDPolicyFactory;
}());
export { UniqueRequestIDPolicyFactory };
//# sourceMappingURL=UniqueRequestIDPolicyFactory.js.map