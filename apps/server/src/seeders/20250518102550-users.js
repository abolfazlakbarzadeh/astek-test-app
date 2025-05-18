'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345678', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'mreza',
        name: 'محمدرضا رضایی',
        phone: '09121234567',
        password: hashedPassword,
        is_super_admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'samin_kh',
        name: 'ثمین خانی',
        phone: '09351234567',
        password: hashedPassword,
        is_super_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alireza1379',
        name: 'علیرضا فرهمند',
        phone: '09103561234',
        password: hashedPassword,
        is_super_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
