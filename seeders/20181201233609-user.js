const users = [
  {
    id: 1,
    name: 'Antonio Mejias',
    password: '$2y$12$agwMn.7PsR..BqJ4Ewv1kO6ITpEFEhhC.Q9hkXLh.i9xriF4O3N1K',
    rol: 'admin',
    email: 'antonio@gmail.com',
  },
  {
    id: 2,
    name: 'Raelyx Cordero',
    password: '$2y$12$Hu6KBlC3OBZgBMWQ.CO76e.41JNfCVGZi2L6rtQaWOeJlhGyHQAzO',
    rol: 'user',
    email: 'raelyx@gmail.com',
  },
];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', users, {}),

  down: (queryInterface) => {
    const usersIds = users.map(user => user.id);
    return queryInterface.bulkDelete('Users', [{
      id: usersIds,
    }]);
  },
};
