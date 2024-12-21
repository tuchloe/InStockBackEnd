import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import warehouseRoute from "./routes/warehouse-router.js"
import inventoryRoute from "./routes/inventories-router.js"

const app = express();


app.use(cors());
app.use(express.json()); 

app.get('/', (_req, res) => {
  res.send('This is the home route');
});

app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to InsStock' });
});

app.use("/api/warehouses", warehouseRoute);

app.use("/api/inventories", inventoryRoute);

app.all('*', (_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
