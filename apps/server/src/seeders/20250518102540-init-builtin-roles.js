'use strict';

const {permissions} = require("validation");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('roles', [{
            id: 1,
            name: 'role-1',
            permissions: JSON.stringify([permissions.account_management.edit, permissions.account_management.create, permissions.account_management.view, permissions.account_management.assignRole,]),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 2,
            name: 'role-2',
            permissions: JSON.stringify([permissions.account_management.view, permissions.account_management.assignRole,]),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 3,
            name: 'role-3',
            permissions: JSON.stringify([permissions.role_management.view, permissions.role_management.edit,]),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 4,
            name: 'role-4',
            permissions: JSON.stringify([permissions.role_management.view, permissions.role_management.create,]),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 5,
            name: 'role-5',
            permissions: JSON.stringify([permissions.product_management.view, permissions.product_management.create,]),
            createdAt: new Date(),
            updatedAt: new Date()
        },])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
