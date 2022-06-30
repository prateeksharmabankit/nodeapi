// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/**
 * Generate IPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @export
 * @param {IPRange} ipRange
 * @returns {string}
 */
export function ipRangeToString(ipRange) {
    return ipRange.end ? ipRange.start + "-" + ipRange.end : ipRange.start;
}
//# sourceMappingURL=IPRange.js.map