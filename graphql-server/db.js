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
const CBObject = sequelize.import(__dirname + '/models/cb_objects');
const Office = sequelize.import(__dirname + '/models/cb_offices');
const People = sequelize.import(__dirname + '/models/cb_people');
const Relationship = sequelize.import(__dirname + '/models/cb_relationships');

// Association
Degree.People = Degree.belongsTo(People, {
  as: 'people',
  foreignKey: 'object_id',
});

People.Degree = People.hasMany(Degree, {
  as: 'degrees',
  foreignKey: 'object_id',
});

Relationship.People = Relationship.belongsTo(People, {
  as: 'people',
  foreignKey: 'person_object_id',
});

People.Relationship = People.hasMany(Relationship, {
  as: 'relationships',
  foreignKey: 'person_object_id',
});

Relationship.CBObject = Relationship.belongsTo(CBObject, {
  as: 'object',
  foreignKey: 'relationship_object_id',
});

CBObject.Relationship = CBObject.hasMany(Relationship, {
  as: 'relationship',
  foreignKey: 'relationship_object_id',
});

Office.CBObject = Office.belongsTo(CBObject, {
  as: 'object',
  foreignKey: 'object_id',
});

CBObject.Office = CBObject.hasOne(Office, {
  as: 'office',
  foreignKey: 'object_id',
});

CBObject.Acquired = CBObject.belongsToMany(CBObject, {
  as: 'acquiredBy',
  through: {
    model: Acquisition,
    unique: false,
  },
  foreignKey: 'acquired_object_id',
  // otherKey: 'acquiring_object_id',
});

CBObject.Acquire = CBObject.belongsToMany(CBObject, {
  as: 'acquire',
  through: {
    model: Acquisition,
    unique: false,
  },
  foreignKey: 'acquiring_object_id',
  // otherKey: 'acquiried_object_id',
});

Fund.Investment = Fund.belongsToMany(CBObject, {
  as: 'investor',
  through: {
    model: Investment,
    unique: false,
  },
  foreignKey: 'investor_object_id',
  otherKey: 'funded_object_id',
});

CBObject.Investment = CBObject.belongsToMany(Fund, {
  as: 'funded',
  through: {
    model: Investment,
    unique: false,
  },
  foreignKey: 'funded_object_id',
  otherKey: 'investor_object_id',
});

CBObject.Employee = CBObject.belongsToMany(People, {
  as: 'employee',
  through: {
    model: Relationship,
    unique: false,
  },
  foreignKey: 'relationship_object_id',
  otherKey: 'person_object_id',
});

People.Company = People.belongsToMany(CBObject, {
  as: 'company',
  through: {
    model: Relationship,
    unique: false,
  },
  foreignKey: 'person_object_id',
  otherKey: 'relationship_object_id',
});

People.Fund = People.belongsToMany(Fund, {
  as: 'fund',
  through: {
    model: Relationship,
    unique: false,
  },
  foreignKey: 'person_object_id',
  otherKey: 'relationship_object_id',
});

People.Milestone = People.hasMany(Milestone, {
  as: 'milestone',
  foreignKey: 'object_id',
});

CBObject.Milestone = CBObject.hasMany(Milestone, {
  as: 'milestone',
  foreignKey: 'object_id',
});

Fund.Milestone = Fund.hasMany(Milestone, {
  as: 'milestone',
  foreignKey: 'object_id',
});

CBObject.FundingRound = CBObject.hasMany(FundingRound, {
  as: 'fundinground',
  foreignKey: 'object_id',
});

CBObject.IPO = CBObject.hasMany(IPO, {
  as: 'IPO',
  foreignKey: 'object_id',
});

module.exports = {
  Acquisition,
  Degree,
  FundingRound,
  Fund,
  Investment,
  IPO,
  Milestone,
  CBObject,
  Office,
  People,
  Relationship,
};
