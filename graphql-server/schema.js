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

// Acquisition
const AcquisitionType = new GraphQLObjectType({
  name: 'Acquisition',
  fields: _.assign(attributeFields(Acquisition)),
});

// Degree
const DegreePeopleType = new GraphQLObjectType({
  name: 'DegreePeople',
  fields: _.assign(attributeFields(People)),
});

const DegreeType = new GraphQLObjectType({
  name: 'Degree',
  fields: _.assign(attributeFields(Degree), {
    people: {
      type: new GraphQLList(DegreePeopleType),
      resolve: resolver(Degree.People, {
        separate: true,
      }),
    },
  }),
});

// FundingRound
const FundingRoundType = new GraphQLObjectType({
  name: 'FundingRound',
  fields: _.assign(attributeFields(FundingRound)),
});

// Fund
const FundMilestoneType = new GraphQLObjectType({
  name: 'FundMilestone',
  fields: _.assign(attributeFields(Milestone)),
});

const FundInvestmentType = new GraphQLObjectType({
  name: 'FundInvestment',
  fields: _.assign(attributeFields(Investment)),
});

const FundType = new GraphQLObjectType({
  name: 'Fund',
  fields: _.assign(attributeFields(Fund), {
    milestone: {
      type: new GraphQLList(FundMilestoneType),
      resolve: resolver(Fund.Milestone, {
        separate: true,
      }),
    },
    investment: {
      type: new GraphQLList(FundInvestmentType),
      resolve: resolver(Fund.Investment, {
        separate: true,
      }),
    },
  }),
});

// Investment
const InvestmentType = new GraphQLObjectType({
  name: 'Investment',
  fields: _.assign(attributeFields(Investment)),
});

// IPO
const IPOType = new GraphQLObjectType({
  name: 'IPO',
  fields: _.assign(attributeFields(IPO)),
});

// Milestone
const MilestoneType = new GraphQLObjectType({
  name: 'Milestone',
  fields: _.assign(attributeFields(Milestone)),
});

// Office
const OfficeObjectType = new GraphQLObjectType({
  name: 'OfficeObject',
  fields: _.assign(attributeFields(Object)),
});

const OfficeType = new GraphQLObjectType({
  name: 'Office',
  fields: _.assign(attributeFields(Office), {
    object: {
      type: new GraphQLList(OfficeObjectType),
      resolve: resolver(Office.Object, {
        separate: true,
      }),
    },
  }),
});

// Object
const ObjectAcquiredType = new GraphQLObjectType({
  name: 'ObjectAcquired',
  fields: _.assign(attributeFields(Object)),
});

const ObjectAcquiringType = new GraphQLObjectType({
  name: 'ObjectAcquire',
  fields: _.assign(attributeFields(Object)),
});

const ObjectEmployeeType = new GraphQLObjectType({
  name: 'ObjectEmployee',
  fields: _.assign(attributeFields(People)),
});

const ObjectFundingRoundType = new GraphQLObjectType({
  name: 'ObjectFundingRound',
  fields: _.assign(attributeFields(FundingRound)),
});

const ObjectInvestmentType = new GraphQLObjectType({
  name: 'ObjectInvestment',
  fields: _.assign(attributeFields(Fund)),
});

const ObjectIPOType = new GraphQLObjectType({
  name: 'ObjectIPO',
  fields: _.assign(attributeFields(IPO)),
});

const ObjectMilestoneType = new GraphQLObjectType({
  name: 'ObjectMilestone',
  fields: _.assign(attributeFields(Milestone)),
});

const ObjectOfficeType = new GraphQLObjectType({
  name: 'ObjectOffice',
  fields: _.assign(attributeFields(Office)),
});

const ObjectRelationshipType = new GraphQLObjectType({
  name: 'ObjectRelationship',
  fields: _.assign(attributeFields(Relationship)),
});

const ObjectType = new GraphQLObjectType({
  name: 'Object',
  fields: _.assign(attributeFields(Object), {
    acquired: {
      type: new GraphQLList(ObjectAcquiredType),
      resolve: resolver(Object.Acquired, {
        separate: true,
      }),
    },
    acquiring: {
      type: new GraphQLList(ObjectAcquiringType),
      resolve: resolver(Object.Acquiring, {
        separate: true,
      }),
    },
    employee: {
      type: new GraphQLList(ObjectEmployeeType),
      resolve: resolver(Object.Employee, {
        separate: true,
      }),
    },
    fundinground: {
      type: new GraphQLList(ObjectFundingRoundType),
      resolve: resolver(Object.FundingRound, {
        separate: true,
      }),
    },
    investment: {
      type: new GraphQLList(ObjectInvestmentType),
      resolve: resolver(Object.Investment, {
        separate: true,
      }),
    },
    IPO: {
      type: new GraphQLList(ObjectIPOType),
      resolve: resolver(Object.IPO, {
        separate: true,
      }),
    },
    milestone: {
      type: new GraphQLList(ObjectMilestoneType),
      resolve: resolver(Object.Milestone, {
        separate: true,
      }),
    },
    office: {
      type: new GraphQLList(ObjectOfficeType),
      resolve: resolver(Object.Office, {
        separate: true,
      }),
    },
    relationship: {
      type: new GraphQLList(ObjectRelationshipType),
      resolve: resolver(Object.Relationship, {
        separate: true,
      }),
    },
  }),
});

// People
const PeopleCompanyType = new GraphQLObjectType({
  name: 'PeopleCompany',
  fields: _.assign(attributeFields(Object)),
});

const PeopleDegreeType = new GraphQLObjectType({
  name: 'PeopleDegree',
  fields: _.assign(attributeFields(Degree)),
});

const PeopleFundType = new GraphQLObjectType({
  name: 'PeopleFund',
  fields: _.assign(attributeFields(Fund)),
});

const PeopleRelationshipType = new GraphQLObjectType({
  name: 'PeopleRelationship',
  fields: _.assign(attributeFields(Relationship)),
});

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: _.assign(attributeFields(People), {
    company: {
      type: new GraphQLList(PeopleCompanyType),
      resolve: resolver(People.Company, {
        separate: true,
      }),
    },
    degree: {
      type: new GraphQLList(PeopleDegreeType),
      resolve: resolver(People.Degree, {
        separate: true,
      }),
    },
    fund: {
      type: new GraphQLList(PeopleFundType),
      resolve: resolver(People.Fund, {
        separate: true,
      }),
    },
    milestone: {
      type: new GraphQLList(MilestoneType),
      resolve: resolver(People.Milestone, {
        separate: true,
      }),
    },
    relationship: {
      type: new GraphQLList(PeopleRelationshipType),
      resolve: resolver(People.Relationship, {
        separate: true,
      }),
    },
  }),
});

// Relationship
const RelationshipObjectType = new GraphQLObjectType({
  name: 'RelationshipObject',
  fields: _.assign(attributeFields(Object)),
});

const RelationshipPeopleType = new GraphQLObjectType({
  name: 'RelationshipPeople',
  fields: _.assign(attributeFields(People)),
});

const RelationshipType = new GraphQLObjectType({
  name: 'Relationship',
  fields: _.assign(attributeFields(Relationship), {
    object: {
      type: new GraphQLList(RelationshipObjectType),
      resolve: resolver(Relationship.Object, {
        separate: true,
      }),
    },
    people: {
      type: new GraphQLList(RelationshipPeopleType),
      resolve: resolver(Relationship.People, {
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
        type: new GraphQLList(AcquisitionType),
        args: defaultArgs(Acquisition),
        resolve: resolver(Acquisition),
      },
      degree: {
        type: new GraphQLList(DegreeType),
        args: defaultArgs(Degree),
        resolve: resolver(Degree),
      },
      fundingRound: {
        type: new GraphQLList(FundingRoundType),
        args: defaultArgs(FundingRound),
        resolve: resolver(FundingRound),
      },
      fund: {
        type: new GraphQLList(FundType),
        args: defaultArgs(Fund),
        resolve: resolver(Fund),
      },
      investment: {
        type: new GraphQLList(InvestmentType),
        args: defaultArgs(Investment),
        resolve: resolver(Investment),
      },
      IPO: {
        type: new GraphQLList(IPOType),
        args: defaultArgs(IPO),
        resolve: resolver(IPO),
      },
      milestone: {
        type: new GraphQLList(MilestoneType),
        args: defaultArgs(Milestone),
        resolve: resolver(Milestone),
      },
      object: {
        type: new GraphQLList(ObjectType),
        args: defaultArgs(Object),
        resolve: resolver(Object),
      },
      office: {
        type: new GraphQLList(OfficeType),
        args: defaultArgs(Office),
        resolve: resolver(Office),
      },
      people: {
        type: new GraphQLList(PeopleType),
        args: defaultArgs(People),
        resolve: resolver(People),
      },
      relationship: {
        type: new GraphQLList(RelationshipType),
        args: defaultArgs(Relationship),
        resolve: resolver(Relationship),
      },
    },
  }),
});

module.exports = schema;
