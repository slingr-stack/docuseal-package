/**
 * Gets a configuration from the properties.
 *
 * @param {string} property - The name of the property to get. If it is empty, return the entire configuration object.
 * @return {string} - The value of the property or the whole object as string.
 */
exports.getConfiguration = function (property) {
    if (!property) {
        return config.get();
    }
    return config.get(property);
};

/**
 * Verifies the secret of the webhook matches the secret configured in the package.
 *
 * @param {string} secret - The secret found in the webhook.
 * @returns {boolean} True if the secret is valid, false otherwise.
 */
exports.verifySecret = function (secret) {
    let checkWebhooksSecret = config.get("checkWebhooksSecret")
    let webhooksSecret = config.get("webhooksSecret")
    if (!checkWebhooksSecret) {
        sys.logs.warn("[docuseal] Webhooks signature verification is disabled");
        return true;
    }
    return secret === webhooksSecret;
};