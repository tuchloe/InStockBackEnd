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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await db("warehouses").where({ id }).first();
    res.json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/inventories", async (_req, res) => {
    try {
      const { id } = _req.params;
      const warehouseInventory = await db("inventories").where({ warehouse_id: id });
      res.status(200).json(warehouseInventory);
    } catch (error) {
      console.error("Error fetching warehouse inventory:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


export default router;
