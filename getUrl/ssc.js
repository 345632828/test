const Koa = require('koa');
var cheerio = require('cheerio'); 
var rp = require('request-promise');
const Sequelize = require('sequelize');
const config = require('./config');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('GBK', 'UTF-8');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Pet = sequelize.define('pet',
 {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
        },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

var options = {
    uri: 'http://www.cqcp.net/game/ssc/',
    transform: function (body) {
        return cheerio.load(body);
    }
};
const app = new Koa();
app.use(async (ctx, next) => {
   await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<head><meta charset="utf-8"/></head>'+'<h1>Hello，你好</h1>'; 	 
    var liArr =[];	
    rp(options.uri).then(function ($) {   
        
       //var $=cheerio.load($);

    var result = iconv.convert(new Buffer($, 'binary')).toString();
    var $ = cheerio.load(result);
        
      $("#openlist ul").each(function(i,e){
        var str = $(this).find("li").eq(0).text();
         $(this).find("li").each(function( a,b){
            var $this = $(this).text();
            console.log(`i---list:${$this}/n`);
            liArr.push($this);
         });
      }); 
	  //console.log(`i---list:${str}/n`);      
    }).then(function(){
        var now = Date.now();
        liArr = liArr[1].toString();
        console.log(`--- liArr:${ liArr[1]}/n`);  
        (async () => {
        var dog = await Pet.create({
        id: 'd-' + now,
        name: "liArr",
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
        });
        })();
    }).catch(function (err) {console.log(err)});
    
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
