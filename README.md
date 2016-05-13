#CrunchBase Analysis

## Install the dependencies
```
npm install
```

## To test sequelize
```
npm test
```

## To start the GraphQL sever
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