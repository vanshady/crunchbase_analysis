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

// Degree belongsTo people test
Degree
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ all: true }],
  })
  .then((degree) => {
    console.log(degree.people.get('first_name') + ' ' + degree.people.get('last_name'));
  });

// People hasMany Degrees test
People
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ all: true }],
  })
  .then((people) => {
    people.degree.map((d) => {
      console.log(d.get('institution'));
    });
  });

// Relationship belongsTo People test
Relationship
  .findAll({
    where: { person_object_id: 'p:3262' },
    include: [{ all: true }],
  })
  .then((relationships) => {
    relationships.map((r) => {
      if (r.object) {
        console.log(r.people.get('last_name') + ' works at ' + r.object.get('name'));
      }
    });
  });

// acquired test
Object
  .findOne({
    where: { id: 'c:10' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    console.log(object.get('name') + ' is acquired by ' + object.acquired[0].get('name'));
  });

// acquire test
Object
  .findOne({
    where: { id: 'c:11' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    console.log(object.get('name') + ' acquired ' + object.acquiring[0].get('name'));
  });

// employee test
Object
  .findOne({
    where: { id: 'c:10' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    object.employee.map((r) => {
      console.log(r.get('last_name') + ' works at ' + object.get('name'));
    });
  });

// FundingRound test
Object
  .findOne({
    where: { id: 'c:4' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    console.log("Funding Round");
    object.fundinground.map((r) => {
      console.log(r.get('funding_round_type'));
    });
  });
