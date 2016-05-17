#CrunchBase Analysis
The crunchbase 2013 snapshot data can be downloaded from
https://data.crunchbase.com/docs/2013-snapshot

## Install the dependencies
```
npm install
```

## Configuration
After importing the data, configure ```config.js``` to match your database settings.

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
Developed by [Minwei Xu](http://mwxu.me)