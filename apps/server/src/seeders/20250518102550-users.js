'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345678', 10);

    return queryInterface.bulkInsert('users', [
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
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alireza1379',
        name: 'علیرضا فرهمند',
        phone: '09103561234',
        role_id: 2,
        password: hashedPassword,
        is_super_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alireza1380',
        name: 'علیرضا فرهمند 2',
        phone: '09103561235',
        role_id: 3,
        password: hashedPassword,
        is_super_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alireza1381',
        name: 'علیرضا فرهمند 3',
        phone: '09103561236',
        role_id: 4,
        password: hashedPassword,
        is_super_admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alireza1382',
        name: 'علیرضا فرهمند 4',
        phone: '09103561236',
        role_id: 5,
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
