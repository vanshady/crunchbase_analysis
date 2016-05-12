// Including dependency
const Sequelize = require('sequelize');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const _ = require('lodash');
import { resolver, attributeFields } from 'graphql-sequelize';
const express = require('express');
const app = express();

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

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

const degreeType = new GraphQLObjectType({
  name: 'Degree',
  fields: _.assign(attributeFields(Degree)),
});

const peopleType = new GraphQLObjectType({
  name: 'People',
  fields: _.assign(attributeFields(People), {
    degree: {
      type: new GraphQLList(degreeType),
      resolve: resolver(People.Degrees, {
        separate: true,
      }),
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      people: {
        type: peopleType,
        args: {
          object_id: {
            description: 'id of the user',
            type: GraphQLString,
          },
        },
        resolve: resolver(People),
      },
    },
  }),
});

app
  .use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  }))
  .listen(3000, () => {
    console.log('GraphQL server running on http:// localhost:3000/graphql');
  });
