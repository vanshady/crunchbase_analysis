//Including dependency
var Sequelize = require("sequelize");
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var resolver = require('graphql-sequelize').resolver;
var express = require('express');
var app = express();

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
  
var degreeType = new graphql.GraphQLObjectType({
  name: 'Degree',
  fields: {
    id: {
      type: graphql.GraphQLInt,
    },
    object_id: {
      type: graphql.GraphQLString
    },
    degree_type: {
      type: graphql.GraphQLString,
    },
    subject: {
      type: graphql.GraphQLString,
    },
    institution: {
      type: graphql.GraphQLString,
    },
    graduated_at: {
      type: graphql.GraphQLString,
    }
  }
});

var peopleType = new graphql.GraphQLObjectType({
  name: 'People',
  fields: {
    id: {
      type: graphql.GraphQLInt,
    },
    object_id: {
      type: graphql.GraphQLString
    },
    first_name: {
      type: graphql.GraphQLString
    },
    last_name: {
      type: graphql.GraphQLString
    },
    birthplace: {
      type: graphql.GraphQLString
    },
    affiliation_name: {
      type: graphql.GraphQLString
    },
    degree: {
      type: degreeType,
      resolve: resolver(People.Degrees)
    }
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      people: {
        type: peopleType,
        args: {
          object_id: {
            description: 'id of the user',
            type: graphql.GraphQLString
          }
        },
        resolve: resolver(People)
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
  .listen(3000, function() {
    console.log('GraphQL server running on http://localhost:3000/graphql');
  });