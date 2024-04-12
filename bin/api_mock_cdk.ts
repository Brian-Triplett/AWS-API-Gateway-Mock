#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiMockCdkStack } from '../lib/api_mock_cdk-stack';

const app = new cdk.App();
new ApiMockCdkStack(app, 'ApiMockCdkStack');
