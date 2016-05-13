const Sequelize = require('sequelize');

// Setting up the config
const config = require('./config');
const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config.options
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  });

// Models
const Acquisition = sequelize.import(__dirname + '/models/cb_acquisitions');
const Degree = sequelize.import(__dirname + '/models/cb_degrees');
const FundingRound = sequelize.import(__dirname + '/models/cb_funding_rounds');
const Fund = sequelize.import(__dirname + '/models/cb_funds');
const Investment = sequelize.import(__dirname + '/models/cb_investments');
const IPO = sequelize.import(__dirname + '/models/cb_ipos');
const Milestone = sequelize.import(__dirname + '/models/cb_milestones');
const Object = sequelize.import(__dirname + '/models/cb_objects');
const Office = sequelize.import(__dirname + '/models/cb_offices');
const People = sequelize.import(__dirname + '/models/cb_people');
const Relationship = sequelize.import(__dirname + '/models/cb_relationships');

// Association
Degree.People = Degree.belongsTo(People, {
  as: 'people',
  foreignKey: 'object_id',
  targetKey: 'object_id',
});

People.Degrees = People.hasMany(Degree, {
  as: 'degrees',
  foreignKey: 'object_id',
});

Relationship.People = Relationship.belongsTo(People, {
  as: 'people',
  foreignKey: 'person_object_id',
  targetKey: 'object_id',
});

People.Relationships = People.hasMany(Relationship, {
  as: 'relationships',
  foreignKey: 'person_object_id',
});

Relationship.Objects = Relationship.belongsTo(Object, {
  as: 'object',
  foreignKey: 'relationship_object_id',
});

Object.Relationships = Object.hasMany(Relationship, {
  as: 'relationship',
  foreignKey: 'relationship_object_id',
});

Office.Objects = Office.belongsTo(Object, {
  as: 'object',
  foreignKey: 'object_id',
});

Object.Offices = Object.hasOne(Office, {
  as: 'office',
  foreignKey: 'object_id',
});

Object.Acquired = Object.belongsToMany(Object, {
  as: 'acquiredBy',
  through: Acquisition,
  foreignKey: 'acquired_object_id',
  targetKey: 'acquiring_object_id',
});

Object.Acquire = Object.belongsToMany(Object, {
  as: 'acquire',
  through: Acquisition,
  foreignKey: 'acquiring_object_id',
  targetKey: 'acquiried_object_id',
});

Fund.Investments = Fund.belongsToMany(Object, {
  as: 'investment',
  through: Investment,
  foreignKey: 'investor_object_id',
  targetKey: 'funded_object_id',
});

// Object.Employees = Object.belongsToMany(People, {
//   as: 'employee',
//   through: Relationship,
//   foreignKey: 'relationship_object_id',
//   targetKey: 'person_object_id',
// });

People.Companies = People.belongsToMany(Object, {
  as: 'company',
  through: Relationship,
  foreignKey: 'person_object_id',
  targetKey: 'relationship_object_id',
});

// People.Funds = People.belongsToMany(Fund, {
//   as: 'fund',
//   through: Relationship,
//   foreignKey: 'person_object_id',
//   targetKey: 'relationship_object_id',
// });

module.exports = {
  Acquisition,
  Degree,
  FundingRound,
  Fund,
  Investment,
  IPO,
  Milestone,
  Object,
  Office,
  People,
  Relationship,
};
