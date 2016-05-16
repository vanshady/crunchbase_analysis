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

Degree
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ all: true }],
  })
  .then((degree) => {
    console.log(degree.people.get('first_name') + ' ' + degree.people.get('last_name'));
  });

People
  .findOne({
    where: { object_id: 'p:3262' },
    include: [{ all: true }],
  })
  .then((people) => {
    people.degrees.map((d) => {
      console.log(d.get('institution'));
    });
  });

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

CBObject
  .findOne({
    where: { id: 'c:10' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    console.log(object.get('name') + ' is acquired by ' + object.acquiredBy[0].get('name'));
  });

CBObject
  .findOne({
    where: { id: 'c:11' },
    include: [
      { all: true },
    ],
  })
  .then((object) => {
    console.log(object.get('name') + ' acquired ' + object.acquire[0].get('name'));
  });

