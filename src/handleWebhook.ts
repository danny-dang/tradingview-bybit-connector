import {
  LinearInverseInstrumentInfoV5,
  OrderParamsV5,
  RestClientV5,
} from 'bybit-api';
import { Request, Response } from 'express';
import config from './config';

const client = new RestClientV5({
  key: config.bybitApiKey,
  secret: config.bybitApiSecret,
  recv_window: 200000,
  demoTrading: config.demoTrading,
});

let allSymbolInfo: Record<string, LinearInverseInstrumentInfoV5> = {};
const getInstrumentsInfo = async () => {
  const res = await client.getInstrumentsInfo({ category: 'linear' });
  res.result.list.forEach((item) => {
    allSymbolInfo[item.symbol] = {
      ...item,
    };
  });
};
getInstrumentsInfo();

type TradingViewPayload = {
  symbol: string;
  side: string;
  qty: string;
  severSecretKey?: string;
};

export const handleWebhook = async (req: Request, res: Response) => {
  const body = req.body as TradingViewPayload;

  if (config.severSecretKey) {
    if (body.severSecretKey !== config.severSecretKey) {
      res.status(403).send('Forbidden');
      return;
    }
  }

  try {
    const symbol = body.symbol.replace('.P', '');
    const side = body.side === 'buy' ? 'Buy' : 'Sell';
    const symbolInfo = allSymbolInfo[symbol];
    const lotSizeFilter = symbolInfo.lotSizeFilter;
    const step = parseFloat(lotSizeFilter.qtyStep);
    const minQty = parseFloat(lotSizeFilter.minOrderQty);
    const maxQty = parseFloat(lotSizeFilter.maxOrderQty);
    let rawQty = parseFloat(body.qty);
    const scale = 1 / step;
    rawQty = Math.floor(rawQty * scale) / scale;
    rawQty = Math.max(minQty, Math.min(rawQty, maxQty));
    const qty = rawQty.toString();

    const payload = {
      category: 'linear',
      symbol,
      side,
      orderType: 'Market',
      qty,
    } as OrderParamsV5;
    await client.submitOrder(payload);

    console.log('ORDER PLACED SUCCESSFULLY', payload);
  } catch (error) {
    console.log('ERROR PLACING ORDER', error);
  }

  res.status(200).send('OK');
};
