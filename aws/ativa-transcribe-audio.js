var AWS = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService();
exports.handler = (event, context, callback) => {
    var params = {
      LanguageCode: 'pt-BR',
      Media: { /* required */
        MediaFileUri: event.s3URL + ""
      },
      MediaFormat: 'mp3',
      TranscriptionJobName: event.JOB_NAME,
      "Settings": { 
        "ChannelIdentification": true,
        "VocabularyName": "vocabulario-final"
      },

    };
    transcribeservice.startTranscriptionJob(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     {
        console.log(data);
        event.wait_time = 30;
        event.JOB_NAME = data.TranscriptionJob.TranscriptionJobName;
        callback(null, event);
      }
    });

};