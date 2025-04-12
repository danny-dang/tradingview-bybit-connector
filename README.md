# Tradingview Bybit Connector (Futures)

Version v1.0.1

Last update: Apr 12th, 2025

Simple server that connects between Tradingview and Bybit for Futures trading. It connects any Trading Strategy

## Tradingview Alert payload

```
{
  "symbol":"{{ticker}}",
  "side":"{{strategy.order.action}}",
  "qty":"{{strategy.order.contracts}}",
  "severSecretKey": "YOUR_SEVER_SECRET_KEY"
}
```

Example what you will receive:

```json
{
  "symbol": "MNTUSDT.P",
  "side": "sell",
  "qty": "4170.352",
  "severSecretKey": "YOUR_SEVER_SECRET_KEY"
}
```

Also make sure you use "Order fills only" in Tradingview Alert

## How to run the server

1. Install dependencies

```
yarn install
```

2. Create a `.env` file, copy from the file `.env.example`, then fill in your API keys:

```
BYBIT_API_KEY=
BYBIT_API_SECRET=
SEVER_SECRET_KEY=
IS_DEMO_TRADING=
```

- `BYBIT_API_KEY`: Your Bybit API key.
- `BYBIT_API_SECRET`: Your Bybit API secret.
- `SEVER_SECRET_KEY`: Your own server secret key for security so that no one can make request to your sever without the secret key
- `IS_DEMO_TRADING`: If you're using Demo trading

3. Run the server

```
yarn start
```
