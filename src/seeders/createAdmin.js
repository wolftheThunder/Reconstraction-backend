const bcrypt = require("bcryptjs");
const { Admin } = require("../models"); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    if (!Admin) {
      console.error("Admin model is undefined. Check the import path.");
      return;
    }

    const email = "admin@example.com";

    const existingAdmin = await Admin.findOne({ where: { email } }); 
    if (existingAdmin) {
      console.log("Admin already exists, skipping seeder.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert("Admins", [
      {
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("Admin user created successfully!");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admins", { email: "admin@example.com" });
  },
};
