import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
import { RequestLogOptions } from "../LoggingPolicyFactory";
/**
 * LoggingPolicy is a policy used to log requests.
 *
 * @class LoggingPolicy
 * @extends {BaseRequestPolicy}
 */
export declare class LoggingPolicy extends BaseRequestPolicy {
    private tryCount;
    private operationStartTime;
    private requestStartTime;
    private readonly loggingOptions;
    /**
     * Creates an instance of LoggingPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {RequestLogOptions} [loggingOptions=DEFAULT_REQUEST_LOG_OPTIONS]
     * @memberof LoggingPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, loggingOptions?: RequestLogOptions);
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof LoggingPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=LoggingPolicy.d.ts.map