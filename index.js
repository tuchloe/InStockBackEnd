import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const express = require('express');
const cors = require('cors');
require('dotenv').config(); 


const app = express();


app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('This is the home route');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to InsStock' });
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
