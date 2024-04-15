# Mocking AWS API Gatway with MockIntegration

This repo contains an example of using [MockIntegraiton](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.MockIntegration.html) to setup a mocked REST endpoint for AWS API Gateway. This article draws heavily from the following article: https://dev.to/dvddpl/mock-a-restful-api-with-aws-apigateway-and-mockintegration-584n. 

This app also uses the `cdk init` command to scaffold the structure of this app.

## Prerequisites
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) version 2.137.0 or later
- A [CDK Bootstrapped](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_bootstrap) AWS Account 

## How to Use
- Authenticate locally with your target AWS Account
- Run `cdk deploy` from the root directory
- Open the created API Gateway in your AWS console and you can send Test events to the `mock/` GET resource. Any request that has `orgId=999` as a URL query parameter will trigger a 403 response.

## Template

The scaffoldoing of this template was created using 
