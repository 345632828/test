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

var Pet = sequelize.define('Persons',
 {
    personID: {
        type: Sequelize.STRING(50),
        primaryKey: true
        },
    FirstName: Sequelize.STRING(15),
    LastName: Sequelize.STRING(15),
    Age: Sequelize.BIGINT
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
                    title:  password,
                    email: email
            });
        }else{

           

            var dog = await Pet.create({
                personID: 'd-' + now,
                FirstName: email,
                LastName: password,
                Age:25
            });

             ctx.render('register-no.html', {
                    title:  password,
                    email: email
            });

        }
      
      
})

router.get("/vue/:name",async (ctx,next) => {
    var pets = await Pet.findAll({});
  
   

  var arr = [];
  console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log("JSON.stringify:"+JSON.stringify(p));
        arr.push(JSON.stringify(p));
    } 

    ctx.render('vue.html', {
      title:  "password",
      arr: arr            
    });
})



module.exports = router.routes();