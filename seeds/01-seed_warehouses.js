/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('warehouses').del()
  await knex('warehouses').insert([
    // data from PJT2-14
    {
      id: 1,
      warehouse_name: "Manhattan",
      address: "503 Broadway",
      city: "New York",
      country: "USA",
      contact_name: "Parmin Aujla",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "paujla@instock.com"
    },
    {
      id: 2,
      warehouse_name: "Washington",
      address: "33 Pearl Street SW",
      city: "Washington",
      country: "USA",
      contact_name: "Greame Lyon",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "glyon@instock.com"
    }
  ]);
};
