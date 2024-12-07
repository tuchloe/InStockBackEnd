import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import knex from 'knex';
import { body, validationResult } from 'express-validator';

const app = express();
const db = knex(require('./knexfile').development);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the home route');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to InsStock' });
});

// post request new inventories

app.post('/api/inventories', [
  body('warehouse_id').isInt().withMessage('warehouse_id must be an integer'),
  body('item_name').notEmpty().withMessage('item_name is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('category').notEmpty().withMessage('category is required'),
  body('status').notEmpty().withMessage('status is required'),
  body('quantity').isInt().withMessage('quantity must be an integer')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  try {
    const warehouse = await db('warehouses').where({ id: warehouse_id }).first();
    if (!warehouse) {
      return res.status(400).json({ error: 'warehouse_id does not exist' });
    }

    const [id] = await db('inventories').insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity
    }).returning('id');

    res.status(201).json({
      id,
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// put request edit new inventories

app.put('/api/inventories/:id', [
  body('warehouse_id').isInt().withMessage('warehouse_id must be an integer'),
  body('item_name').notEmpty().withMessage('item_name is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('category').notEmpty().withMessage('category is required'),
  body('status').notEmpty().withMessage('status is required'),
  body('quantity').isInt().withMessage('quantity must be an integer')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  try {
    const warehouse = await db('warehouses').where({ id: warehouse_id }).first();
    if (!warehouse) {
      return res.status(400).json({ error: 'warehouse_id does not exist' });
    }

    const inventory = await db('inventories').where({ id }).first();
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await db('inventories').where({ id }).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity
    });

    res.status(200).json({
      id,
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});