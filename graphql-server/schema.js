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

const AcquisitionType = new GraphQLObjectType({
  name: 'Acquisition',
  fields: _.assign(attributeFields(Acquisition)),
});

const DegreeType = new GraphQLObjectType({
  name: 'Degree',
  fields: _.assign(attributeFields(Degree)),
});

const FundingRoundType = new GraphQLObjectType({
  name: 'FundingRound',
  fields: _.assign(attributeFields(FundingRound)),
});

const FundType = new GraphQLObjectType({
  name: 'Fund',
  fields: _.assign(attributeFields(Fund)),
});

const InvestmentType = new GraphQLObjectType({
  name: 'Investment',
  fields: _.assign(attributeFields(Investment)),
});

const IPOType = new GraphQLObjectType({
  name: 'IPO',
  fields: _.assign(attributeFields(IPO)),
});

const MilestoneType = new GraphQLObjectType({
  name: 'Milestone',
  fields: _.assign(attributeFields(Milestone)),
});

const OfficeType = new GraphQLObjectType({
  name: 'Office',
  fields: _.assign(attributeFields(Office)),
});

const RelationshipType = new GraphQLObjectType({
  name: 'Relationship',
  fields: _.assign(attributeFields(Relationship)),
});

const ObjectType = new GraphQLObjectType({
  name: 'Object',
  fields: _.assign(attributeFields(Object)),
});

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: _.assign(attributeFields(People), {
    degree: {
      type: new GraphQLList(DegreeType),
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
        type: PeopleType,
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
