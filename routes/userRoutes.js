/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET the current user
  router.get("/me", (req, res) => {
    const user_id = req.session.user_id;
    const queryString = `SELECT * FROM users WHERE id = $1;`;
    db.query(queryString, [user_id])
      .then((data) => {
        const currUser = data.rows[0];
        res.json(currUser);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET users from DB
  router.get("/", (req, res) => {
    const user_id = req.params.user_id;
    const queryString = `SELECT * FROM users;`;
    db.query(queryString, [user_id])
      .then((data) => {
        const users = data.rows;
        res.json(users, user_id);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET users map from DB
  router.get("/:id", (req, res) => {
    const user_id = req.params.id;
    const queryString = `
    SELECT users.id as user_id,
    username,
    password,
    users.latitude as user_lat,
    users.longitude as user_long,
    maps.id as map_id, owner_id,
    maps.name as map_name,
    maps.latitude as map_lat,
    maps.longitude as map_long
    FROM users
    JOIN maps ON owner_id = users.id
    WHERE owner_id = $1;`;
    db.query(queryString, [user_id])
      .then((data) => {
        const userMaps = data.rows;
        res.json(userMaps);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Will add edit once I get a hang of it TODO <---
  // Implement me

  return router;
};
