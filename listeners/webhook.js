/****************************************************
 Webhooks
 ****************************************************/

listeners.defaultWebhookDocuSeal = {
    label: 'Catch HTTP DocuSeal events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/docuseal',
        }
    },
    callback: function(event) {
        let headers = event.data.headers;
        let secret = headers["X-DocuSeal-Secret"] || headers["x-docuseal-secret"];
        if (pkg.docuseal.utils.verifySecret(secret)) {
            sys.events.triggerEvent("docuseal:webhook", event.data);
        } else {
            sys.logs.warn('[docuseal] Invalid secret for webhook');
        }
    }
};