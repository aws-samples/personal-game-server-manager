# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

import boto3
import json
class noIpFound(Exception): pass

def lambda_handler(event, context): #standard function called on lambda invocation

#get IP address
    instanceId = event['instanceId']
    ec2 = boto3.client('ec2')
    response = ec2.describe_instances(InstanceIds=[instanceId])
    try:
        publicIp = response['Reservations'][0]['Instances'][0]['PublicIpAddress']
    except Exception:
        raise noIpFound('No Public IP address found...yet....') #if IP address is none, raise error
    updateDNS(publicIp, event['hostedZoneId'], event['domainName'])
 
    return {
        'statusCode': 200,
    }      


def updateDNS(publicIp, hostedZoneId, domainName):
    r53 = boto3.client('route53')
    r53.change_resource_record_sets(
    HostedZoneId=hostedZoneId,
    ChangeBatch={
        'Comment': 'Auto updated by mc handler',
        'Changes': [
            {
                'Action': 'UPSERT',
                'ResourceRecordSet': {
                    'Name': domainName,
                    'Type': 'A',
                    'TTL': 5,
                    'ResourceRecords': [
                        {
                            'Value': publicIp
                        }
                    ]
                }
            }
        ]
    }    )