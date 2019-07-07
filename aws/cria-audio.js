var http = require('http');


exports.handler = async (event, context, callback) => {
    var body = JSON.stringify(event.audio);
    console.log(body);
    var options= {
      hostname: 'dd27e966.ngrok.io',
      port: 80,
      path: '/api/Audio',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    
    var req = http.request(options, (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        console.log('sucesso');
        console.log(data);
        callback(null, event);
      });
    });
    
    req.on('error', (e) => {
      console.log('erro');
      console.log(`Houve um erro: ${e.message}`);
      callback(null, e);
    });
    
    req.write(body);
    req.end();       
};
