# Overview

Repo: [https://github.com/slingr-stack/docuseal-package](https://github.com/slingr-stack/docuseal-package)

This package helps to connect to DocuSeal API. It has the following features:

- Authentication through API key
- Direct access to the API

# Configuration

These are the configuration parameters:

## API Key

Name: `apiKey`

This is the API key for DocuSeal. For more information on how to get it, please look at its documentation [here](https://ai.google.dev/gemini-api/docs/api-key).

## Webhooks URL

Name: `webhooksUrl`

This is the URL you should configure for webhooks in DocuSeal. If you don't configure the webhooks URL in DocuSeal you app won't receive the events. Find more information about webhooks in the [DocuSeal documentation](https://www.docuseal.co/docs/api#form-webhook).

## Check Webhooks Secret

Name: `checkWebhooksSecret`

Optionally, you can configure DocuSeal to send a secret in the headers of webhooks. This way, you can validate webhooks are legit.

## Webhooks Secret

Name: `webhooksSecret`

This is the webhooks secret configured in DocuSeal. *Important*: configure `X-DocuSeal-Secret` as the header name when configuring the secret.

# Javascript API

## HTTP calls

You can make standard HTTP requests to the DocuSeal API:

```js
// create a submission off a template
let submission = pkg.docuseal.api.post({
    path: '/submissions',
    body: {
        template_id: 10002,
        send_email: true,
        submitters: [
            {
                role: 'Contractor',
                email: 'contractor@test.com',
                name: 'Test Contractor',
                fields: [
                    {
                        name: 'ContractorFullName',
                        default_value: 'Test Contractor',
                        read_only: true
                    }
                ]
            }
        ]
    }
});
```

The package automatically handles authentication, so no need to worry about that.

More information about making HTTP calls, please refer to the documentation of the [HTTP service](https://github.com/slingr-stack/http-service).

Finally, there are some helpers that are explained below.

# About Slingr

Slingr is a low-code rapid application development platform that speeds up development,
with robust architecture for integrations and executing custom workflows and automation.

[More info about Slingr](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
