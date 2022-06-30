import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { UniqueRequestIDPolicy } from "./policies/UniqueRequestIDPolicy";
/**
 * UniqueRequestIDPolicyFactory is a factory class helping generating UniqueRequestIDPolicy objects.
 *
 * @export
 * @class UniqueRequestIDPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export declare class UniqueRequestIDPolicyFactory implements RequestPolicyFactory {
    /**
     * Creates a UniqueRequestIDPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {UniqueRequestIDPolicy}
     * @memberof UniqueRequestIDPolicyFactory
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): UniqueRequestIDPolicy;
}
//# sourceMappingURL=UniqueRequestIDPolicyFactory.d.ts.map