var AWS = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService();

exports.handler = (event, context, callback) => {

    var params = {
      TranscriptionJobName: event.JOB_NAME
    };
    transcribeservice.getTranscriptionJob(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
      event.STATUS = data.TranscriptionJob.TranscriptionJobStatus;
      event.TranscriptFileUri = data.TranscriptionJob.Transcript.TranscriptFileUri;
      callback(null,event);
    });
};