import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";

const router = express.Router();
const db = knex(knexConfig);

router.get("/", async ( req, res) => {
    try {
        const inventories = await db("inventories").select("*");
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching inventories", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async ( req, res) => {
    try {
        const { id } =  req.params;
        const inventories = await db("inventories").where({ id }).first();
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching inventories", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async ( req, res ) => {
    const { id } = req.params;
    try {
        await db("inventories").where({ id: req.params.id }).del();
        res.sendStatus(204);
    } catch {
        res.status(404).json({ message: `Error deleting inventory item ${id}`});
    }
});

export default router;
