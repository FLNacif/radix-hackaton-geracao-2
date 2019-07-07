var https = require('https');
var http = require('http');
let AWS = require('aws-sdk');
//var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});


var usinas = [
"U.H.S.S.",
"U.H.I.T.",
"U.H.S.O.",
"U.H.C.B.",
"U.H.E.T.",
"U.H.J.A.",
"U.H.M.I.",
"U.H.M.A.",
"U.H.S.A.",
"U.H.P.F.",
"U.H.P.P.",
"C.E.C.L.",
"C.E.T.R.",
"C.E.U.R.",
"C.E.S.M.",
"U.T.F.E.",
"F.V.A.E.",
"U.C.L.A.",
"P.H.R.O.",
"P.H.R.O.",
"U.T.I.B.",
"U.F.C.A.",
"U.E.T.B.",
"U.T.P.S.",
"C.E.U.R.",
"C.T.J.L.",
"U.T.L.A.",
"U.T.L.B.",
"U.T.L.C.",
"Salto-Santiago",
"Itá",
"Salto-Osório",
"Cana-Brava",
"Estreito",
"Jaguara",
"Miranda",
"Machadinho",
"São-Salvador",
"Passo-Fundo",
"Ponte-de-Pedra",
"Campo-Largo",
"Conjunto",
"Trairi",
"Umburanas",
"Santa-Mônica",
"Ferrari",
"Assú",
"Solar",
"Lages",
"Rondonópolis",
"José",
"Rocha",
"Ibitiúva",
"Cidade-Azul",
"Tubarão-P.E.D.",
"Pampa-Sul",
"Umburanas",
"Jorge-Lacerda"];

var usuariosCadastrados = ["Meison"
,"Mauro"
,"Vagner"
,"Karla"
,"Ederson"
,"Ediverte"
,"Schimanski"
,"Gabriel"
,"Cleomir"
,"Torres"
,"Pablo"
,"Franco"
,"Griguer"
,"Alexandre"
,"Osani"
,"Guilherme"
,"Tibes"
,"Wagner"
,"Arilton"
,"Marcão"
,"Felipe"
,"Cezerça"
,"Adriano"
,"Ramos"
,"César"
,"Krauze"
,"Luis"
,"Ricardo"
,"Augusto"
,"Odair"
,"Gustavo"
,"Darlan"
,"Julio"
,"Marcelo"
,"Fernando"
,"Viti"
,"Prado"
,"Osvaldo-Elias"
,"Diamei"
,"Minski"
,"Jeferson"
,"Michel"
,"Valdemir"
,"Émerson"
,"Dionei"
,"Lucas"
,"Evandro"
,"Vitório"
,"Pinheiro"
,"Célio"];


let palavrasChavesHidrologia = ['chuva', 'hidrologia', 'vertedouro', 'defluência', 'vertido', 'vertimento']
let palavrasChavesMudancaEstado = ['unidade-para-gerador', 'converter', 'reverter', 'compensar', 'reativo', 'conversor', 'revertida', 'unidade-geradora']
let palavrasChavesTensao = ['k.v.', 'tensão', 'volts', 'barra']
let palavrasChavesPotencia = ['mega', 'mw', 'watt']

function verificaUsinas(texto, listaUsinas){
  let usinasEncontradas = '';
  for (var usina in listaUsinas) {
    if(texto.indexOf(listaUsinas[usina]) > -1)
      usinasEncontradas += ' ' + listaUsinas[usina];
  }
  return usinasEncontradas;
}

function verificaInterlocutores(texto, listaUsuarios){
  let usuariosEncontrados = '';
  for (var user in listaUsuarios) {
    if(texto.indexOf(listaUsuarios[user]) > -1)
      usuariosEncontrados += ' ' + listaUsuarios[user];
  }
  return usuariosEncontrados;
}

function isHidrologia(texto){
  for (var pal in palavrasChavesHidrologia) {
    if(texto.indexOf(palavrasChavesHidrologia[pal]) > -1)
      return true;
  }
  return false;
}

function isMudancaEstado(texto){
  for (var pal in palavrasChavesMudancaEstado) {
    if(texto.indexOf(palavrasChavesMudancaEstado[pal]) > -1)
      return true;
  }
  return false;
}

function isPotencia(texto){
  for (var pal in palavrasChavesPotencia) {
    if(texto.indexOf(palavrasChavesPotencia[pal]) > -1)
      return true;
  }
  return false;
}


function isTensao(texto){
  for (var pal in palavrasChavesTensao) {
    if(texto.indexOf(palavrasChavesTensao[pal]) > -1)
      return true;
  }
  return false;
}

function categorizaLigacao(texto){
  if(isHidrologia(texto))
    return 'hidrologia';
  if(isMudancaEstado(texto))
    return 'mudança-estado';
  if(isTensao(texto))
    return 'tensão';
  if(isPotencia(texto))
    return 'potência';
  return 'outras;'
}

exports.handler = function(event, context, callback) {
    var request_url = event.TranscriptFileUri;
    var urlAudio=event.s3URL.replace("https://s3.amazonaws.com/audio-transcricao", "https://audio-transcricao.s3.amazonaws.com");
    https.get(request_url, (res) => {
      var chunks = [];
	  res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        var results = JSON.parse(body);
        var transcript = results.results.transcripts[0].transcript;
        console.log(transcript)
        var params = {
          LanguageCode: "en",
          Text: transcript + ""
        };
        
        var data = new Date();
        
        var year = data.getFullYear();
        var month = data.getMonth()+1;
        var day = data.getDate();
        var hora = data.getHours();
        var min = data.getMinutes();
        
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        if(hora < 10){
          hora = '0' + hora;
        }
        if(min < 10){
          min = '0' + min;
        }
        
        var dataFormatada = day + '/' + month + '/' + year + ' ' + hora + ':' + min;
        
        var body = JSON.stringify({
          timestamp: +data,
          interlocutores: verificaInterlocutores(transcript, usuariosCadastrados).replace(new RegExp(/\./, 'g'),'').replace(new RegExp(/\-/, 'g'), ' '),
          conteudo: transcript,
          duration: 14,
          usina: verificaUsinas(transcript, usinas).replace(new RegExp(/\./, 'g'),'').replace(new RegExp(/\-/, 'g'), ' '),
          classificacao: categorizaLigacao(transcript),
          url: urlAudio
        });
        
        event.audio = {
          Timestamp: dataFormatada,
          Uri: urlAudio
        };
        event.comando = {
          Timestamp: dataFormatada,
          Acao: categorizaLigacao(transcript),
          Destino: verificaUsinas(transcript, usinas).replace(new RegExp(/\./, 'g'),'').replace(new RegExp(/\-/, 'g'), ' '),
          Valor: 0,
        };
        var options = {
          hostname: 'search-transcricaohackathon-mdaj6mpvrrijdhusq2ngyfk2xe.sa-east-1.es.amazonaws.com',
          port: 80,
          path: '/vitorioso/_doc',
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
            callback(null, event);
          });
        });
        
        req.on('error', (e) => {
          console.log(`Houve um erro: ${e.message}`);
          callback(null, e);
        });
        
        req.write(body);
        req.end();
      });

	}).on('error', (e) => {
	  console.error(e);
	});
};