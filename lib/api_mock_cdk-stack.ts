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
        passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
        requestTemplates: {
          "application/json": `
          {
            #if( $input.params('orgId') == 999)
              "statusCode": 404,
            #else
              "statusCode": 200,
            #end
          }`,
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": `
              {
                "capability": "LLC_BI",
                "id": $input.params('orgId'),
                "status": "available"
              }`,
            },
          },
          {
            statusCode: "404",
            selectionPattern: "404",
            responseTemplates: {
              "application/json": `
              {
                "message": "Org Id $input.params('orgId') not found"
              }`,
            },
          },
        ],
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseModels: {
              "application/json": Model.EMPTY_MODEL,
            },
          },
          {
            statusCode: "404",
            responseModels: {
              "application/json": Model.ERROR_MODEL,
            },
          },
        ],
      }
    );
  }
}
