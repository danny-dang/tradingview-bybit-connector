import './env';
import app from './app';
import http from 'http';

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const createServer = async () => {
  try {
    console.log('Starting server...');

    await server.listen(port);
    console.log(`Server Running on Port: ${port}, ${new Date().toISOString()}`);
  } catch (e) {
    console.log('Error Creating Node Server', JSON.stringify(e));
  }
};

createServer();
