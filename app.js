const Koa = require('koa');


const app = new Koa();

const bodyParser = require('koa-bodyparser');

//const controller = require('./controller');

const templating = require('./templating');

let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static')); //静态谁的模块

app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});



const isProduction = process.env.NODE_ENV === 'production';

console.log(`isProduction:${isProduction}`);

app.use(templating('view', {noCache: !isProduction,watch: !isProduction}));






const routers = require('./controller/controller.js');


app.use(routers);   

app.listen(3000);


