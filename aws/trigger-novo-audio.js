'use strict';

const aws = require('aws-sdk');

var stepfunctions = new aws.StepFunctions();
const s3 = new aws.S3({apiVersion: '2006-03-01'});

exports.handler = (event, context, callback) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {Bucket: bucket,Key: key};

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
            console.log(message);
            callback(message);
        } else {
            var job_name = key.replace("/", "-");
            var stepparams = {
              "stateMachineArn": process.env.STEP_FUNCTIONS_ARN,
               "input": "{\"s3URL\": \"https://s3.amazonaws.com/" + bucket + "/" + key + "\",\"JOB_NAME\": \""+ job_name + "\"}"
            };
            stepfunctions.startExecution(stepparams, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
            });
            callback(null, data.ContentType);
        }
    });
};