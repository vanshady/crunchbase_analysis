//Including dependency
var Sequelize = require("sequelize");
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
import resolver from 'graphql-sequelize';
var express = require('express');
var app = express();

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

//Setting up the config
var config = require('./config')
var sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  config.options
);

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

//Models
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

//Association
Degree.belongsTo(People, {
  as: 'people',
  foreignKey: 'object_id',
  targetKey: 'object_id'
});
People.Degrees = People.hasMany(Degree, {
  as: 'degrees',
  foreignKey: 'object_id',
});

//Sequelize test
Degree
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ model: People, as: 'people' }]
  })
  .then(function (degree) {
    console.log(degree.people.get('first_name') + ' ' + degree.people.get('last_name'))
  });

People
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ model: Degree, as: 'degrees' }]
  })
  .then(function (people) {
    people.degrees.map(function (d) {
      console.log(d.get('institution'));
    });
  });

var degreeType = new GraphQLObjectType({
  name: 'Degree',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(degree) {
          return degree.id;
        }
      },
      object_id: {
        type: GraphQLString,
        resolve(degree) {
          return degree.object_id;
        }
      },
      degree_type: {
        type: GraphQLString,
        resolve(degree) {
          return degree.degree_type;
        }
      },
      subject: {
        type: GraphQLString,
        resolve(degree) {
          return degree.subject;
        }
      },
      institution: {
        type: GraphQLString,
        resolve(degree) {
          return degree.institution;
        }
      },
      graduated_at: {
        type: GraphQLString,
        resolve(degree) {
          return degree.graduated_at;
        }
      }
    }
  }
});

var peopleType = new GraphQLObjectType({
  name: 'People',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(people) {
          return people.id;
        }
      },
      object_id: {
        type: GraphQLString,
        resolve(people) {
          return people.object_id;
        }
      },
      first_name: {
        type: GraphQLString,
        resolve(people) {
          return people.first_name;
        }
      },
      last_name: {
        type: GraphQLString,
        resolve(people) {
          return people.last_name;
        }
      },
      birthplace: {
        type: GraphQLString,
        resolve(people) {
          return people.birthplace;
        }
      },
      affiliation_name: {
        type: GraphQLString,
        resolve(people) {
          return people.affiliation_name;
        }
      },
      degrees: {
        type: new GraphQLList(degreeType),
        resolve(people) {
          return people.getDegrees();
        }
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields() {
      return {
        people: {
          type: peopleType,
          args: {
            object_id: {
              description: 'id of the user',
              type: GraphQLString
            }
          },
          resolve(root, args) {
            return People.findOne({ where: args });
          }
        }
      }
    }
  })
});

app
  .use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: true
  }))
  .listen(3000, function () {
    console.log('GraphQL server running on http://localhost:3000/graphql');
  });