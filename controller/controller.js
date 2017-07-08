const router = require('koa-router')();

const Sequelize = require('sequelize');
const config = require('./config');

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

var now = Date.now();


router.get("/",async (ctx,next) => {
       ctx.response.type  =  'text/html';
       ctx.response.body = '<h1>Hello, /!</h1><script type="text/javascript" src="static/js/bootstrap.js"></script>';
      
})

router.get("/register/:name",async (ctx,next) => {
       var name = ctx.params.name;
        console.log(name);
     
        if(name === 'register-ok'){
            ctx.render('register-ok.html', {
                    title: name
            });
        }else{
            ctx.render('register.html', {
                    title: name
            });
        }
       
      
      
})

router.post("/register/:name",async (ctx,next) => {
          var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if( email === 'register-ok'){
            ctx.render('register-ok.html', {
                    title:  email
            });
        }else{
            ctx.render('register-no.html', {
                    title:  email
            });
        }
      
      
})

router.get("/tp/:name",async (ctx,next) => {

    var pets = await Pet.findAll({
        where: {
            name: 'Odie'
        }
    });

  console.log(`find ${pets.length} pets:`);

  var name =  JSON.stringify(pets[1]);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        // name = JSON.stringify(p);
    }  
        
        console.log('index ok!');
        ctx.render('index.html', {
                title: name
        });
      
})



module.exports = router.routes();