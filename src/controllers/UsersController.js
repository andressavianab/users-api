var knex = require("../database/connection");
const User = require("../models/User");

class UsersController {
  async create(req, res) {
    var { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).send({ message: "Please, fill in all fields!" });
      return;
    }

    var emailDB = await knex("users").where("email", email);
    try {
      if (emailDB.length === 0) {
        await User.new(name, email, password, role);
        res.status(200).send({ message: "User created succesfully" });
        return;
      } else {
        res.status(400).send({ message: "Email is alredy registered" });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async get(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
      return;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (user.length === 1) {
        res.status(200).send(user);
        return;
      } else {
        res
          .status(404)
          .send({ message: `No user found that matches the id ${id}` });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, role } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        res
          .status(404)
          .send({ error: `No user found that matches the id ${id}` });
      }

      if (email) {
        const existingEmail = await knex("users").where("email", email).first();
        if (existingEmail) {
          return res.status(400).json({ error: "Email alredy exists" });
        }
      }

      const updateFields = {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
      };

      const result = await User.update(id, updateFields);
      if (result.error) {
        res.status(400).json({ error: result.error });
      } else {
        res.status(200).json({ message: result.message });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UsersController();
