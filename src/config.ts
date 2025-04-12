export default {
  bybitApiKey: process.env.BYBIT_API_KEY || '',
  bybitApiSecret: process.env.BYBIT_API_SECRET || '',
  severSecretKey: process.env.SEVER_SECRET_KEY || '',
  demoTrading: process.env.IS_DEMO_TRADING === 'true',
};
