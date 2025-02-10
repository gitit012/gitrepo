const express = require('express');
const client = require('../config/db');
const validateUser = require('../middleware/validation');

const router = express.Router();

router.route('/users')
    .get(async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM nodepg');
            res.json(result.rows);
        } catch (err) {
            console.error("Error fetching users:", err);
            res.status(500).send("Internal Server Error");
        }
    })
    .post(validateUser, async (req, res) => {
        const { id, firstname, lastname, location } = req.body;
        try {
            await client.query('INSERT INTO nodepg (id, firstname, lastname, location) VALUES ($1, $2, $3, $4)', 
                               [id, firstname, lastname, location]);
            res.send('Insertion was successful');
        } catch (err) {
            console.error("Error inserting user:", err);
            res.status(500).send("Internal Server Error");
        }
    });

router.route('/users/:id')
    .get(async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM nodepg WHERE id = $1', [req.params.id]);
            if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error fetching user:", err);
            res.status(500).send("Internal Server Error");
        }
    })
    .put(validateUser, async (req, res) => {
        const { firstname, lastname, location } = req.body;
        try {
            const result = await client.query(
                'UPDATE nodepg SET firstname = $1, lastname = $2, location = $3 WHERE id = $4',
                [firstname, lastname, location, req.params.id]
            );
            if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });
            res.send("Update was successful");
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).send("Internal Server Error");
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await client.query('DELETE FROM nodepg WHERE id = $1', [req.params.id]);
            if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });
            res.send("User deleted successfully");
        } catch (err) {
            console.error("Error deleting user:", err);
            res.status(500).send("Internal Server Error");
        }
    });

module.exports = router;