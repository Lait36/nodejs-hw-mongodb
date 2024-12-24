// srs/index.js


import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstarap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstarap();
