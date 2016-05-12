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
Degree.belongsTo(People, {
  as: 'people',
  foreignKey: 'object_id',
  targetKey: 'object_id',
});

People.Degrees = People.hasMany(Degree, {
  as: 'degrees',
  foreignKey: 'object_id',
});

Relationship.belongsTo(People, {
  as: 'people',
  foreignKey: 'person_object_id',
  targetKey: 'object_id',
});

People.Relationships = People.hasMany(Relationship, {
  as: 'relationships',
  foreignKey: 'person_object_id',
});

Relationship.belongsTo(Object, {
  as: 'object',
  foreignKey: 'relationship_object_id',
});

Object.Relationships = Object.hasMany(Relationship, {
  as: 'relationship',
  foreignKey: 'relationship_object_id',
});

// Sequelize test
Degree
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ model: People, as: 'people' }],
  })
  .then((degree) => {
    console.log(degree.people.get('first_name') + ' ' + degree.people.get('last_name'));
  });

People
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ model: Degree, as: 'degrees' }],
  })
  .then((people) => {
    people.degrees.map((d) => {
      console.log(d.get('institution'));
    });
  });

Relationship
  .findAll({
    where: { person_object_id: 'p:3262' },
    include: [
      { model: Object, as: 'object' },
      { model: People, as: 'people' },
    ],
  })
  .then((relationships) => {
    relationships.map((r) => {
      if (r.object) {
        console.log(r.people.get('last_name') + ' works at ' + r.object.get('name'));
      }
    });
  });

Object
  .findOne({
    where: { id: 'c:1' },
    include: [{ model: Relationship, as: 'relationship' }],
  })
  .then((people) => {
    people.relationship.map((d) => {
      console.log(d.get('title'));
    });
  });

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
