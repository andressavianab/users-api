const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async new(name, email, password, role) {
    try {
      var hash = await bcrypt.hash(password, 10);
      await knex("users").insert({
        name: name,
        email: email,
        password: hash,
        role: role,
      });
      return;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .from("users");
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    try {
      const result = await knex
        .select(["id", "name", "email", "role"])
        .from("users")
        .where({ id: id }).first();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, updateFields) {
    try {
      const updatedUser = await knex("users")
        .where("id", id)
        .update(updateFields);
      if (updatedUser === 1) {
        return { message: "User updated successfully" };
      } else {
        return { error: "Failed to update user." };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new User();
