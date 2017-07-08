// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
var cheerio = require('cheerio'); 
var rp = require('request-promise');

var options = {
    uri: 'https://cnodejs.org/',
    transform: function (body) {
        return cheerio.load(body);
    }
};
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    //ctx.response.body = '<h1>Hello, koa2!</h1>';

    rp(options.uri).then(function ($) {
    
        
       var $=cheerio.load($);
       
        
      $(".topic_title").each(function(i,e){
          var str = $(this).text();
        
          var list = $(e).attr("href");
        console.log(`i:${i}---list:${str}`);
    
       });
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... 
    });
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
