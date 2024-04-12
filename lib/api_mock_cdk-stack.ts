import { Duration, Stack, StackProps, Stage } from "aws-cdk-lib";
import {
  RestApi,
  MockIntegration,
  Model,
  PassthroughBehavior,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class ApiMockCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const demoRestApi = new RestApi(this, "RestApiDemo");

    demoRestApi.root.addResource("mock").addMethod(
      "GET",
      new MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": `
              #set($allParams = $input.params())
              {
              "is-cool": true,
              "body-json" : $input.json('$'),
              "params" : {
              #foreach($type in $allParams.keySet())
                  #set($params = $allParams.get($type))
              "$type" : {
                  #foreach($paramName in $params.keySet())
                  "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
                      #if($foreach.hasNext),#end
                  #end
              }
                  #if($foreach.hasNext),#end
              #end
              },
              "stage-variables" : {
              #foreach($key in $stageVariables.keySet())
              "$key" : "$util.escapeJavaScript($stageVariables.get($key))"
                  #if($foreach.hasNext),#end
              #end
              },
              "context" : {
                  "account-id" : "$context.identity.accountId",
                  "api-id" : "$context.apiId",
                  "api-key" : "$context.identity.apiKey",
                  "authorizer-principal-id" : "$context.authorizer.principalId",
                  "caller" : "$context.identity.caller",
                  "cognito-authentication-provider" : "$context.identity.cognitoAuthenticationProvider",
                  "cognito-authentication-type" : "$context.identity.cognitoAuthenticationType",
                  "cognito-identity-id" : "$context.identity.cognitoIdentityId",
                  "cognito-identity-pool-id" : "$context.identity.cognitoIdentityPoolId",
                  "http-method" : "$context.httpMethod",
                  "stage" : "$context.stage",
                  "source-ip" : "$context.identity.sourceIp",
                  "user" : "$context.identity.user",
                  "user-agent" : "$context.identity.userAgent",
                  "user-arn" : "$context.identity.userArn",
                  "request-id" : "$context.requestId",
                  "resource-id" : "$context.resourceId",
                  "resource-path" : "$context.resourcePath"
                  }
              }`,
            },
          },
        ],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseModels: {
              "application/json": Model.EMPTY_MODEL,
            },
          },
        ],
      }
    );
  }
}
