var originRequest = require('request')  
var cheerio = require('cheerio')  
var iconv = require('iconv-lite')  
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function request (url, callback) {  
  var options = {
    url: url,
    encoding: null,
    //代理服务器
    //proxy: 'http://xxx.xxx.xxx.xxx:8888',
    headers: headers
  }
  originRequest(options, callback)
}

var url = 'http://www.cqcp.net/game/ssc/'

request(url, function (err, res, body) {  
    var html = iconv.decode(body, 'gb2312')
    var $ = cheerio.load(html, {decodeEntities: false})
    var  str = $("#openlist ul").html();
    console.log(str)
    
})