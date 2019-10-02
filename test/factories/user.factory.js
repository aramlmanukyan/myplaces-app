const faker = require('faker');

class UserFactory {
    generateList(count, attrs = {}) {
        let list = [];
        while(count) {
            list.push(this.generate(attrs));
            count--;
        }
        return list;
    }

    generate(attrs) {
        return Object.assign({}, {
            name: faker.name.firstName(),
            // lastname: faker.name.lastName(),
            // username: faker.internet.userName(),
            email: faker.internet.email(),
            password: 'password1',
            // role: 'user'
            type: 1
        }, attrs);
    }
}

module.exports = new UserFactory();
