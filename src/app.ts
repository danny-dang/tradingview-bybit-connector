import express from 'express';
import path from 'path';
import { handleWebhook } from './handleWebhook';

const app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Tradingview Bybit Connector');
});

app.post('/webhook', handleWebhook);

export default app;
