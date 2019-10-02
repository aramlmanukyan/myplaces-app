const db = require('../config/sequelize');

const countries = [
    {name: "Armenia"}
];

const cities = [
    {name: "Yerevan", CountryId: 1},
    {name: "Gyumry", CountryId: 1},
    {name: "Hrazdan", CountryId: 1},
];

db.Country.bulkCreate(countries)
    .then(() => db.Country.findAll())
    .then(console.log);

db.City.bulkCreate(cities)
    .then(() => db.City.findAll())
    .then(console.log);


