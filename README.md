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

## Example Query
```
query {
  object(where: { name: "Palantir Technologies" }) {
    name
    office {
      address1
      address2
      city
      zip_code
      country_code
    }
    domain
    homepage_url
    overview
    founded_at
    employee {
      first_name
      last_name
    }
    funding_rounds
    fundinground {
      funding_round_type
      funded_at
      raised_amount_usd
      pre_money_valuation_usd
      post_money_valuation_usd
      source_description
    }
    acquiring {
      name
    }
  }
}
```

## Example Query Output
```
{
  "data": {
    "object": [
      {
        "name": "Palantir Technologies",
        "office": [
          {
            "address1": "100 Hamilton Avenue",
            "address2": "Suite 300",
            "city": "Palo Alto",
            "zip_code": "94301-1651",
            "country_code": "USA"
          },
          {
            "address1": "1660 International Dr",
            "address2": "8th Floor",
            "city": "McLean",
            "zip_code": "22102",
            "country_code": "USA"
          },
          {
            "address1": "15 Little W 12th Street",
            "address2": null,
            "city": "New York",
            "zip_code": "10014",
            "country_code": "USA"
          },
          {
            "address1": "53 Chandos Place",
            "address2": "Covent Garden",
            "city": "London",
            "zip_code": "WC2N 4 HS",
            "country_code": "GBR"
          },
          {
            "address1": "7 London Circuit",
            "address2": null,
            "city": "Canberra",
            "zip_code": "",
            "country_code": "AUS"
          }
        ],
        "domain": "palantir.com",
        "homepage_url": "http://www.palantir.com",
        "overview": "Palantir's mission is to solve the most important problems for the world's most important institutions.\r\n\r\nPalantir was founded in 2004 by a handful of [PayPal](/company/paypal) alumni and Stanford computer scientists. Since then Palantir has doubled in size every year while retaining early-stage values: a startup culture, strong work ethic, and rigorous hiring standards.\r\n\r\nPalantir works in a variety of problem areas for various customers in both private and public sector, helping them answer questions like: \r\n\r\n* How do you prevent the next $65Bn ponzi scheme? \r\n* How do you take down human trafficking networks? \r\n* How can we help borrowers avoid foreclosure on a massive scale/stabilize housing? \r\n* How can you prevent fraud in Medicare? \r\n* Can you help governments save billions/identify ways to reduce spending? \r\n* Can you help scientists monitor the environment after the Deepwater Horizon Oil Spill? \r\n* How do you defend the IP of companies from cyber espionage by bad actors? \r\n* How can you help stop the genocide in the Sudan? \r\n* How can we help target gangs to end their violence?",
        "founded_at": "Wed Dec 31 2003 16:00:00 GMT-0800 (PST)",
        "employee": [
          {
            "first_name": "Alexander",
            "last_name": "Karp"
          },
          {
            "first_name": "Peter",
            "last_name": "Thiel"
          },
          {
            "first_name": "Joe",
            "last_name": "Lonsdale"
          },
          {
            "first_name": "Nathan",
            "last_name": "Gettings"
          },
          {
            "first_name": "Stephen",
            "last_name": "Cohen"
          },
          {
            "first_name": "Garry",
            "last_name": "Tan"
          },
          {
            "first_name": "Alex",
            "last_name": "Moore"
          },
          {
            "first_name": "Kris",
            "last_name": "Duggan"
          },
          {
            "first_name": "Steve",
            "last_name": "Loughlin"
          },
          {
            "first_name": "David",
            "last_name": "Bernhardt"
          },
          {
            "first_name": "Tim",
            "last_name": "Su"
          },
          {
            "first_name": "Bob",
            "last_name": "McGrew"
          },
          {
            "first_name": "Akash",
            "last_name": "Jain"
          },
          {
            "first_name": "Shyam",
            "last_name": "Sankar"
          },
          {
            "first_name": "Gleb",
            "last_name": "Chuvpilo"
          },
          {
            "first_name": "Jason",
            "last_name": "Rodrigues"
          },
          {
            "first_name": "Garett",
            "last_name": "Gentry"
          },
          {
            "first_name": "Patrick",
            "last_name": "Dugan"
          },
          {
            "first_name": "Ross",
            "last_name": "Fubini"
          },
          {
            "first_name": "Brendan",
            "last_name": "Eich"
          },
          {
            "first_name": "Justin",
            "last_name": "Legakis"
          },
          {
            "first_name": "Jason",
            "last_name": "Mirra"
          },
          {
            "first_name": "James",
            "last_name": "Thompson"
          },
          {
            "first_name": "Todd",
            "last_name": "Medema"
          },
          {
            "first_name": "Kevin",
            "last_name": "Brown"
          },
          {
            "first_name": "Kevin",
            "last_name": "Hartz"
          },
          {
            "first_name": "Jonathan",
            "last_name": "Chu"
          },
          {
            "first_name": "Tony",
            "last_name": "Askew"
          },
          {
            "first_name": "Steven",
            "last_name": "Plunkett"
          },
          {
            "first_name": "Harsh",
            "last_name": "Patel"
          },
          {
            "first_name": "Jared",
            "last_name": "Weinstein"
          },
          {
            "first_name": "Brian",
            "last_name": "Bland"
          }
        ],
        "funding_rounds": 10,
        "fundinground": [
          {
            "funding_round_type": "venture",
            "funded_at": "Mon Nov 16 2009 16:00:00 GMT-0800 (PST)",
            "raised_amount_usd": "35000000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "EDGAR"
          },
          {
            "funding_round_type": "series-c+",
            "funded_at": "Thu Jun 24 2010 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": "90000000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "Palantir: The Next Billion-Dollar Company Raises $90 Million"
          },
          {
            "funding_round_type": "venture",
            "funded_at": "Wed May 04 2011 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": "50000000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "SEC Watch: Palantir Technologies Raises $50 Million In New Funding"
          },
          {
            "funding_round_type": "series-c+",
            "funded_at": "Wed Oct 05 2011 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": "70000000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "Palantir Technologies Raises $70 Million At $2.5 Billion Valuation"
          },
          {
            "funding_round_type": "venture",
            "funded_at": "Tue May 15 2012 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": "56000000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "Palantir Technologies Nabs $56M In New Funding, SEC Filing Shows"
          },
          {
            "funding_round_type": "venture",
            "funded_at": "Thu Sep 26 2013 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": "196500000",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "Palantir Is Raising $197M In Growth Capital, SEC Filing Shows"
          },
          {
            "funding_round_type": "angel",
            "funded_at": "Wed Aug 31 2005 17:00:00 GMT-0700 (PDT)",
            "raised_amount_usd": null,
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": "Why In-Q-Tel investment is a "
          },
          {
            "funding_round_type": "venture",
            "funded_at": "Mon Dec 09 2013 16:00:00 GMT-0800 (PST)",
            "raised_amount_usd": "107508017",
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": "9000000000",
            "source_description": "Palantir"
          },
          {
            "funding_round_type": "other",
            "funded_at": "Fri Dec 31 2010 16:00:00 GMT-0800 (PST)",
            "raised_amount_usd": null,
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": null
          },
          {
            "funding_round_type": "other",
            "funded_at": "Mon Dec 31 2012 16:00:00 GMT-0800 (PST)",
            "raised_amount_usd": null,
            "pre_money_valuation_usd": null,
            "post_money_valuation_usd": null,
            "source_description": null
          }
        ],
        "acquiring": [
          {
            "name": "Voicegem"
          }
        ]
      }
    ]
  }
}
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
5. Fix sub-schema for associations.
6. More robust resolvers.

Developed by [Minwei Xu](http://mwxu.me)
