import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";

const router = express.Router();
const db = knex(knexConfig);

router.get("/inventories", async (_req, res) => {
    try {
        const inventories = await db("inventories").select("*");
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching inventories", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (_req, res) => {
    try {
        const { id } = _req.params;
        const inventories = await db("inventories").where({ id }).first();
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching inventories", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;