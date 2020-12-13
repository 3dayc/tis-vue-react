/*
 * reference site
 * http://stackoverflow.com/questions/4505809/how-to-post-to-a-request-using-node-js
 */

var http  = require('http');
var $url  = require('url');
var $fs   = require('fs' );
var $qs   = require('querystring');

var jsonLogin = JSON.stringify({
    'username': randomString(10, 'afxfdfyrsu98ccy65ki'),
    'email'   : 'email@mail.com',
    'password': 'a075d17f3d453073853f813838c15c3942e1f95'
});
var jsonLogout = JSON.stringify({
    'username': "",
    'email'   : "",
    'password': ""
});

var usersList = [
    {
        'uid': "uid01",
        'pwd': "pwd01",
        'username': "홍길동",
        'email'   : 'email@mail.com',
        'password': randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95')
    },
    {
        'uid': "uid02",
        'pwd': "pwd02",
        'username': randomString(5, 'afxfdfyrs'),
        'email'   : 'email@mail.com',
        'password': randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95')
    },

];

var dataXml = '';
dataXml += '<?xml version="1.0" encoding="utf-8"?>  ';
dataXml += '<REST>                                  ';
dataXml += '    <ListOfLN_Interface>                ';
dataXml += '        <Contact>123304</Contact>       ';
dataXml += '    </ListOfLN_Interface>               ';
dataXml += '</REST>                                 ';
function QueryStringToJSON(qs) {
    var pairs = qs.slice(1).split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

// http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
function getParams(request, response, callback) {
    var params = null;

    if(typeof callback !== 'function') return null;

    if(request.method.toUpperCase() === 'POST') {
        var queryData = "";
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            params = $qs.parse(queryData);
            callback(params, request, response);
        });
    }
    else if (request.method.toUpperCase() === 'GET') {
        params = $url.parse(request.url, true);
        console.log(params.query);

        callback(params, request, response);
    }
    else {
        response.writeHead(405, {'Content-Type': 'text/plain'} );
        response.end();
    }
}

/*
    make a random sting in javascript
    http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
function makeid() {
    var possible = "ABCDEFG HIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var text = "";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*
 make a random sting in javascript
 http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 사용법:
 var randomValue = randomString(5);
 var randomValue = randomString(5, 'PICKCHARSFROMTHISSET');
 */
function randomString(len, charSet) {
    charSet = charSet + 'ABCDE FGHI JKL MNOPQ RS TUVW XY Za bc defg hij klm nop qrst uv wxyz0 12 3 45 67 89';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * charSet.length);
        randomString += charSet.charAt(pos);
    }
    return randomString;
}


http.createServer( function(req, res) {

    console.log('request received.');

    var urlpath = $url.parse(req.url).pathname;

    if( urlpath === '/' && req.method.toUpperCase()==='GET'  ) {
        var msg = "Node 서버가 실행 중입니다.";
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': Buffer.byteLength(msg)
        });
        res.write(msg);
        res.end();
    }

    if( urlpath === '/text' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.txt';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/plain; charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/html' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.html';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/xml' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.xml';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/xml, charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/json' && req.method.toUpperCase()==='GET' ) {

        // 비동기적 읽기
        var filename = __dirname + '/item.json';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/login' /* && req.method.toUpperCase() === 'POST' */ ) {

        console.log( ' login ...');

        var loginInfo = QueryStringToJSON(req.url);

        // DB에서 로그인 검증 처리
        var user = usersList.filter(function (el) {
            return el.uid === this.userid && el.pwd === this.password;
        }, loginInfo);

        var resContent = user.length === 0 ? "" : JSON.stringify(user[0]);
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
            'Content-Type': 'application/json charset=utf-8',
            'Content-Length': Buffer.byteLength(jsoresContentnLogout)
        });
        res.write( resContent );
        res.end();
    }


    if( urlpath === '/logout' /* && req.method.toUpperCase() === 'POST' */ ) {

        console.log( ' logout ...');

        // DB에서 로그아웃 검증 처리


        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
            'Content-Type': 'application/json charset=utf-8',
            'Content-Length': Buffer.byteLength(jsonLogout)
        });
        res.write(jsonLogout);
        res.end();
    }



    // 호출 : http://localhost:5050/board?start=10&end=20
    if( urlpath === '/board' && req.method.toUpperCase() === 'GET'  ) {
        var html = '';

        getParams(req, res, function(data){
            console.log( data );

            var arr = [];
            for(var i=Number(data.query.start); i<=Number(data.query.end); i=i+1){
                var obj = {
                    no: i
                    , title : 'title ' + ("00000000" + i).slice(-8)
                    , writer : makeid()
                    , content : randomString(700, i.toString() )
                };

                arr.push( obj );
            }
            var txt = JSON.stringify(  arr );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();

        });
    }


    if( urlpath === '/welcome' && req.method.toUpperCase() === 'POST'  ) {
        var html = '';

        getParams(req, res, function(data){
            console.log( data );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/plain',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data.username);
            res.end();

        });
    }

}).listen(5050, 'localhost');

console.log('start server - anonymous function');