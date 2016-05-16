const _ = require('lodash');
import { resolver, attributeFields, defaultArgs } from 'graphql-sequelize';

import {
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

const CBObjectType = new GraphQLObjectType({
  name: 'CBObject',
  fields: _.assign(attributeFields(CBObject)),
});

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: _.assign(attributeFields(People), {
    degree: {
      type: new GraphQLList(DegreeType),
      resolve: resolver(People.Degree, {
        separate: true,
      }),
    },
    company: {
      type: new GraphQLList(CBObjectType),
      resolve: resolver(People.Company, {
        separate: true,
      }),
    },
    fund: {
      type: new GraphQLList(FundType),
      resolve: resolver(People.Fund, {
        separate: true,
      }),
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      acquisition: {
        type: AcquisitionType,
        args: defaultArgs(Acquisition),
        resolve: resolver(Acquisition),
      },
      degree: {
        type: DegreeType,
        args: defaultArgs(Degree),
        resolve: resolver(Degree),
      },
      fundingRound: {
        type: FundingRoundType,
        args: defaultArgs(FundingRound),
        resolve: resolver(FundingRound),
      },
      fund: {
        type: FundType,
        args: defaultArgs(Fund),
        resolve: resolver(Fund),
      },
      investment: {
        type: InvestmentType,
        args: defaultArgs(Investment),
        resolve: resolver(Investment),
      },
      IPO: {
        type: IPOType,
        args: defaultArgs(IPO),
        resolve: resolver(IPO),
      },
      milestone: {
        type: MilestoneType,
        args: defaultArgs(Milestone),
        resolve: resolver(Milestone),
      },
      object: {
        type: CBObjectType,
        args: defaultArgs(CBObject),
        resolve: resolver(CBObject),
      },
      office: {
        type: OfficeType,
        args: defaultArgs(Office),
        resolve: resolver(Office),
      },
      people: {
        type: PeopleType,
        args: defaultArgs(People),
        resolve: resolver(People),
      },
      relationship: {
        type: RelationshipType,
        args: defaultArgs(Relationship),
        resolve: resolver(Relationship),
      },
    },
  }),
});

module.exports = schema;
