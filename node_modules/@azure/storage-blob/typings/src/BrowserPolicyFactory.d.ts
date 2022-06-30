import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { BrowserPolicy } from "./policies/BrowserPolicy";
/**
 * BrowserPolicyFactory is a factory class helping generating BrowserPolicy objects.
 *
 * @export
 * @class BrowserPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export declare class BrowserPolicyFactory implements RequestPolicyFactory {
    /**
     * Creates a BrowserPolicyFactory object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {BrowserPolicy}
     * @memberof BrowserPolicyFactory
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BrowserPolicy;
}
//# sourceMappingURL=BrowserPolicyFactory.d.ts.map