import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";

const router = express.Router();
const db = knex(knexConfig);

router.get("/", async (_req, res) => {
    try {
      const warehouses = await db("warehouses").select("*");
      res.json(warehouses);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      res.status(500).json({ message: "Internal server error" });
    }

});


export default router;
