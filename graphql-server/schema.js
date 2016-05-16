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
  fields: _.assign(attributeFields(CBObject)),
});

const OfficeType = new GraphQLObjectType({
  name: 'Office',
  fields: _.assign(attributeFields(Office), {
    object: {
      type: new GraphQLList(OfficeObjectType),
      resolve: resolver(Office.CBObject, {
        separate: true,
      }),
    },
  }),
});

// CBObject
const CBObjectAcquiredType = new GraphQLObjectType({
  name: 'CBObjectAcquired',
  fields: _.assign(attributeFields(CBObject)),
});

const CBObjectAcquiringType = new GraphQLObjectType({
  name: 'CBObjectAcquire',
  fields: _.assign(attributeFields(CBObject)),
});

const CBObjectEmployeeType = new GraphQLObjectType({
  name: 'CBObjectEmployee',
  fields: _.assign(attributeFields(People)),
});

const CBObjectFundingRoundType = new GraphQLObjectType({
  name: 'CBObjectFundingRound',
  fields: _.assign(attributeFields(FundingRound)),
});

const CBObjectInvestmentType = new GraphQLObjectType({
  name: 'CBObjectInvestment',
  fields: _.assign(attributeFields(Fund)),
});

const CBObjectIPOType = new GraphQLObjectType({
  name: 'CBObjectIPO',
  fields: _.assign(attributeFields(IPO)),
});

const CBObjectMilestoneType = new GraphQLObjectType({
  name: 'CBObjectMilestone',
  fields: _.assign(attributeFields(Milestone)),
});

const CBObjectOfficeType = new GraphQLObjectType({
  name: 'CBObjectOffice',
  fields: _.assign(attributeFields(Office)),
});

const CBObjectRelationshipType = new GraphQLObjectType({
  name: 'CBObjectRelationship',
  fields: _.assign(attributeFields(Relationship)),
});

const CBObjectType = new GraphQLObjectType({
  name: 'CBObject',
  fields: _.assign(attributeFields(CBObject), {
    acquired: {
      type: new GraphQLList(CBObjectAcquiredType),
      resolve: resolver(CBObject.Acquired, {
        separate: true,
      }),
    },
    acquiring: {
      type: new GraphQLList(CBObjectAcquiringType),
      resolve: resolver(CBObject.Acquiring, {
        separate: true,
      }),
    },
    employee: {
      type: new GraphQLList(CBObjectEmployeeType),
      resolve: resolver(CBObject.Employee, {
        separate: true,
      }),
    },
    fundinground: {
      type: new GraphQLList(CBObjectFundingRoundType),
      resolve: resolver(CBObject.Acquired, {
        separate: true,
      }),
    },
    investment: {
      type: new GraphQLList(CBObjectInvestmentType),
      resolve: resolver(CBObject.Acquired, {
        separate: true,
      }),
    },
    IPO: {
      type: new GraphQLList(CBObjectIPOType),
      resolve: resolver(CBObject.IPO, {
        separate: true,
      }),
    },
    milestone: {
      type: new GraphQLList(CBObjectMilestoneType),
      resolve: resolver(CBObject.Milestone, {
        separate: true,
      }),
    },
    office: {
      type: new GraphQLList(CBObjectOfficeType),
      resolve: resolver(CBObject.Office, {
        separate: true,
      }),
    },
    relationship: {
      type: new GraphQLList(CBObjectRelationshipType),
      resolve: resolver(CBObject.Relationship, {
        separate: true,
      }),
    },
  }),
});

// People
const PeopleCompanyType = new GraphQLObjectType({
  name: 'PeopleCompany',
  fields: _.assign(attributeFields(CBObject)),
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
  name: 'RelationshipCBObject',
  fields: _.assign(attributeFields(CBObject)),
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
      resolve: resolver(Relationship.CBObject, {
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
