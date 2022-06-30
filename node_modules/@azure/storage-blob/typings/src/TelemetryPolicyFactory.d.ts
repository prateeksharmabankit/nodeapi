import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { TelemetryPolicy } from "./policies/TelemetryPolicy";
/**
 * Interface of TelemetryPolicy options.
 *
 * @export
 * @interface TelemetryOptions
 */
export interface TelemetryOptions {
    /**
     * Configues the costom string that is pre-pended to the user agent string.
     *
     * @type {string}
     * @memberof TelemetryOptions
     */
    value: string;
}
/**
 * TelemetryPolicyFactory is a factory class helping generating TelemetryPolicy objects.
 *
 * @export
 * @class TelemetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
export declare class TelemetryPolicyFactory implements RequestPolicyFactory {
    private telemetryString;
    /**
     * Creates an instance of TelemetryPolicyFactory.
     * @param {TelemetryOptions} [telemetry]
     * @memberof TelemetryPolicyFactory
     */
    constructor(telemetry?: TelemetryOptions);
    /**
     * Creates a TelemetryPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {TelemetryPolicy}
     * @memberof TelemetryPolicyFactory
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): TelemetryPolicy;
}
//# sourceMappingURL=TelemetryPolicyFactory.d.ts.map