# slack-webhook-integration-sample

This example for Slack outgoing webhook using AWS Lambda and API Gateway.

## Setup

### Install npm packages
```bash
$ npm install
```

### Edit config overrides for production deployment
```bash
$ vi serverless.yml
```

```yaml
  environment:
    STAGE: ${self:custom.stage}
    SLACK_OUTGOING_TOKEN: '__SLACK_OUTGOING_TOKEN_HERE__'
```

### Deploy!
```bash:development
$ serverless deploy -v
```

```
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (1.01 MB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....
Serverless: Stack update finished...
Serverless: Removing old service versions...
Service Information
service: slack-webhook-integration
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/slack/webhook
functions:
  receiveWebhook: slack-webhook-integration-dev-receiveWebhook

Stack Outputs
ReceiveWebhookLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:000000000000:function:slack-webhook-integration-dev-receiveWebhook:31
ServiceEndpoint: https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev
```
