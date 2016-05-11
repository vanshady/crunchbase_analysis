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

var Acquisition = sequelize.import(__dirname + "/models/cb_acquisitions");
var Degree = sequelize.import(__dirname + "/models/cb_degrees");
var Funding_round = sequelize.import(__dirname + "/models/cb_funding_rounds");
var Fund = sequelize.import(__dirname + "/models/cb_funds");
var Investment = sequelize.import(__dirname + "/models/cb_investments");
var IPO = sequelize.import(__dirname + "/models/cb_ipos");
var Milestone = sequelize.import(__dirname + "/models/cb_milestones");
var Object = sequelize.import(__dirname + "/models/cb_objects");
var Office = sequelize.import(__dirname + "/models/cb_offices");
var People = sequelize.import(__dirname + "/models/cb_people");
var Relationship = sequelize.import(__dirname + "/models/cb_relationships");

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
  