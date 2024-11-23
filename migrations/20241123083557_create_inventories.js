/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('inventories', (table) => {
            table.increments('id').primary(); // primary key
            table
                .integer('warehouse_id')
                .unsigned()
                .references('id')
                .inTable('warehouses')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('item_name').notNullable();
            table.string('description').notNullable();
            table.string('category').notNullable();
            table.integer('quantity').notNullable();
            // timestamps
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .timestamp('updated_at')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('inventories');
}