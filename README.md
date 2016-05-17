#CrunchBase Analysis
The crunchbase 2013 snapshot data can be downloaded from
https://data.crunchbase.com/docs/2013-snapshot

## Clone the code and install the dependencies
```
git clone https://github.com/vanshady/crunchbase_analysis.git
npm install
```

## Configuration
After importing the MySQL data, configure ```config.js``` to match your database settings.

## To test sequelize
```
npm test
```

## To start the GraphQL sever with nodemon
```
npm run devstart
```

## To start the GraphQL sever without nodemon
```
npm start
```

## Directory Tree
```
|-- graphql-server
    |-- models
    |   |-- *.js: sequelize models
    |-- config.js: configuration of the database
    |-- db.js: database and sequelize
    |-- schema.js: GraphQL schema
    |-- sequelize-test.js: test sequelize queries
    |-- server.js: express/GraphQL Server
```

## Timeline
* Day 1-3: Initialized, imported data, and got familiar with sequelize.
* Day 4: Refactored the code and set up the association.
* Day 5: Refactored the code, set up the graphql-sequelize server, and ran into a problem with association.
* Day 6: Sucessfully debugged with the help of Jiayu Liu.
* Day 7: Finished the sequelize and graphql code.
* Day 8: Refactored the code and used Mocha for unit tests.

## Todos
1. Unit tests for graphql.
2. Use PrintSchema to generate schema docs.
3. Better schema structures.
4. Deploy to Heroku

Developed by [Minwei Xu](http://mwxu.me)
