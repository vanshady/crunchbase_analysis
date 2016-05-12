const _ = require('lodash');
import { resolver, attributeFields } from 'graphql-sequelize';

import {
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
} from './db';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

/* ------------ GraphQL ------------ */
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

module.exports = schema;
