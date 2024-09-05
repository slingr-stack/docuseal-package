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

/**
 * Downloads the audit log of a submission.
 *
 * @param submissionId the ID of the submission
 * @returns {*} a file object
 */
exports.downloadAuditLog = function(submissionId) {
    if (!submissionId) {
        throw 'Invalid argument received. This helper should receive the following parameters as non-empty strings: [submissionId].';
    }
    let submission = pkg.docuseal.api.get(`/submissions/${submissionId}`);
    let url = submission.audit_log_url;
    sys.logs.debug('[docuseal] Downloading document from: ' + url);

    httpOptions = {
        path: url,
        settings: {
            forceDownload: true,
            downloadSync: true,
            fileName: 'document.pdf'
        }
    };

    return pkg.docuseal.api.get(httpOptions);
};


/**
 * Downloads the last document on a submission.
 *
 * @param submissionId the ID of the submission
 * @returns {*} a file object
 */
exports.downloadDocument = function(submissionId) {
    if (!submissionId) {
        throw 'Invalid argument received. This helper should receive the following parameters as non-empty strings: [submissionId].';
    }
    let submission = pkg.docuseal.api.get(`/submissions/${submissionId}`);
    if (!submission.documents) {
        throw 'Submission has not documents';
    }
    let url;
    submission.documents.forEach(document => {
        if (document.url) {
            url = document.url;
        }
    })
    sys.logs.debug('[docuseal] Downloading document from: ' + url);

    httpOptions = {
        path: url,
        settings: {
            forceDownload: true,
            downloadSync: true,
            fileName: 'document.pdf'
        }
    };

    return pkg.docuseal.api.get(httpOptions);
};

