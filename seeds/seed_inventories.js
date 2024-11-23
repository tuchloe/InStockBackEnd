/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {
      "id": 1,
      "warehouse_name": "Manhattan",
      "item_name": "Television",
      "description": "This 50\", 4K LED TV provides a crystal-clear picture and vivid colors.",
      "category": "Electronics",
      "status": "In Stock",
      "quantity": 500
    },
    {
      "id": 2,
      "warehouse_name": "Manhattan",
      "item_name": "Gym Bag",
      "description": "Made out of military-grade synthetic materials, this gym bag is highly durable, water resistant, and easy to clean.",
      "category": "Gear",
      "status": "Out of Stock",
      "quantity": 0
    }
  ]);
};
