//Including dependency
var Sequelize = require("sequelize");
 
//Setting up the config
var sequelize = new Sequelize('crunchbase', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
  