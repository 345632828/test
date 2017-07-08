// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
var cheerio = require('cheerio'); 
var rp = require('request-promise');
const phantom = require('phantom');

var options = {
    uri: 'http://d.weibo.com/102803_ctg1_1988_-_ctg1_1988?from=faxian_hot&mod=fenlei#',
    transform: function (body) {
        return cheerio.load(body);
    }
};

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open(options.uri);
    console.log(status);

    const content = await page.property('content');
    console.log(content);

    await instance.exit();
}());



const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
  
});

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3001...');
