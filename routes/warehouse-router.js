import express from "express";
import knex from "knex";
import knexConfig from "../knexfile.js";
import validator from "validator"; 

const router = express.Router();
const db = knex(knexConfig);

// GET list of warehouses (PJT2-14)
router.get("/", async ( req, res) => {
    try {
      const warehouses = await db("warehouses").select("*");
      res.status(200).json(warehouses);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const warehouse = await db("warehouses").where({ id }).first();
      res.status(200).json(warehouse);
    } catch (error) {
      console.error("Error fetching warehouse:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.get("/:id/inventories", async ( req, res) => {
      try {
        const { id } =  req.params;
        const warehouseInventory = await db("inventories").where({ warehouse_id: id });
        res.status(200).json(warehouseInventory);
      } catch (error) {
        console.error("Error fetching warehouse inventory:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
// Edit warehouse details of a selected warehouse (PJT2-18)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  try {
    const warehouse = await db("warehouses").where("id", id).first();
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found." });
    }

    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validator.isMobilePhone(contact_phone, "any", { strictMode: false })) {
      return res.status(400).json({ message: "Invalid phone number." });
    }

    if (!validator.isEmail(contact_email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const updatedWarehouse = await db("warehouses")
      .where("id", id)
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      })
      .returning("*"); 

    return res.status(200).json(updatedWarehouse[0]);
  } catch (error) {
    console.error("Error updating warehouse:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
  
// DELETE a warehouse (PJT2-19)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryDeleted = await db("inventory")
      .where("warehouse_id", id)
      .del();

    if (inventoryDeleted === 0) {
      return res.status(404).send("Warehouse not found");
    }

    const warehouseDeleted = await db("warehouses")
      .where("id", id)
      .del();

    if (warehouseDeleted === 0) {
      return res.status(404).send("Warehouse not found");
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting warehouse:", error);
    return res.status(500).send("Server error");
  }
});

export default router;