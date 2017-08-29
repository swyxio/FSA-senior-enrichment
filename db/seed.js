var chance = require('chance')(123);
var toonAvatar = require('cartoon-avatar');
const db = require('../db');
var Campus = require('../db/models/campus');
var Student = require('../db/models/student');
var Promise = require('bluebird');

var numStudents = 100;
var emails = chance.unique(chance.email, numStudents);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randStudent () {
  var gender = chance.gender();
  return Student.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    phone: chance.phone(),
    bio: chance.paragraph(),
    email: emails.pop(),
    campusId: chance.natural({min: 1, max: 6})
  });
}

function generateStudents () {
  var students = doTimes(numStudents, randStudent);
  return students;
}
function createStudents () {
  return Promise.map(generateStudents(), function (student) {
    return student.save();
  });
}

//http://listofrandomnames.com/index.cfm?textarea
// const names = [
//     'Paul Atreides',
//     'Megatron',
//     'Neytiri',
//     'Rooter',
//     'Jabba the Hutt',
//     'Jor-El',
//     'Ender Wiggin',
//     'Ben Kenobi'
//     ]

// const students = names.map((name, i) => ({
//     name,
//     bio: `biography of ${name}. My favorite number is ${i}`,
//     campusId: (i % 6) + 1
// }))

// campus 

const campuses = [
  { name: 'Arrakis', imageUrl: 'https://orig13.deviantart.net/17b8/f/2010/223/a/6/arrakis_by_akreon.jpg' },
  { name: 'Cybertron', imageUrl: 'https://orig13.deviantart.net/a8c4/f/2010/024/0/8/cybertron_planet_by_jjasso.jpg' },
  { name: 'Krypton', imageUrl: 'https://3.bp.blogspot.com/-H6DAS9qtrMY/UJ7aPLVJFUI/AAAAAAAAV0U/MgZ5ulfkknc/w1200-h630-p-k-no-nu/Planet+Krypton.jpg' },
  { name: 'Pandora', imageUrl: 'https://www.christiedigital.com/img/Press%20Releases/Jake%20Peaceful.jpg' },
  { name: 'Lusitania', imageUrl: 'https://orig05.deviantart.net/793a/f/2008/253/2/c/lusitania_by_andreewallin.jpg' },
  { name: 'Tatooine', imageUrl: 'https://www.nerdcoremovement.com/wp-content/uploads/2013/07/pd_starwars_tatoonie_planet_thg_110913_xwide.jpg' }
];

// const seed = () =>
//   Promise.all(campuses.map(campus =>
//     Campus.create(campus))
//   )
//   .then(() =>
// //   console.log(campuses)
//   Promise.all(students.map(student =>
//     Student.create(student))
//   )
// );

const createCampuses = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )

function seed () {
  return createCampuses()
  .then(() => createStudents())
}

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
