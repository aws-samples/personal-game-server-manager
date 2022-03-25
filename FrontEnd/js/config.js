// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

//EDIT ONLY THESE VALUES
var mcCloudfrontUrl = 'REPLACE-WITH-CFURL' //mcCloudfrontUrl
var mcCognitoClientID = 'REPLACE-WITH-COGNITO' //mcCognitoClientID
var mcCognitoDomainName = 'REPLACE-WITH-COGDOMAIN' //mcCognitoDomainName
var mcCognitoPoolsId = 'REPLACE-WITH-POOLS-ID' //mcCognitoPoolsId
var API_URL = 'REPLACE-WITH-APIURL'; //mcControlApiUrl

const query_string = "?mctagname=REPLACE-WITH-IDTAGNAME&mctagvalue=REPLACE-WITH-IDTAGVALUE"
var tagName = 'REPLACE-WITH-IDTAGNAME'
var tagValue = 'REPLACE-WITH-IDTAGVALUE'
var stackname = 'REPLACE-WITH-STACKNAME'
//EDIT ONLY THESE VALUES

var aws_auth_config = {
  "aws_user_pools_id": mcCognitoPoolsId,
  "aws_user_pools_web_client_id": mcCognitoClientID,
  "oauth": {
      "domain": mcCognitoDomainName,
      "scope": [
          "openid",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": mcCloudfrontUrl + '/signed_in.html',
      "redirectSignOut": mcCloudfrontUrl + '/logout.html',
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_cognito_username_attributes": ["EMAIL"],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};
