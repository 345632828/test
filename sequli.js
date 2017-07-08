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

(async () => {
  //添加
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });

        dog = await Pet.create({
        id: 'd-' + 1314,
        name: 'Gaffey',
        gender: false,
        birth: '2018-18-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
 //删除
  await Pet.destroy({
  where: {
            name: '2'
        }
  });
   
 await Pet.update({
    name:"chen"
 },{
  where: {
            name: 'Gaffey'
        }

 });
  //查找
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
  
   


  console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }  
})();
