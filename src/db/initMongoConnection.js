// srs/db/initMongoConnection.js

import dotenv from 'dotenv';
import mongoose from 'mongoose';

// srs/db/initMongoConnection.js
dotenv.config();
const USER = process.env.MONGODB_USER;
const PWD = process.env.MONGODB_PASSWORD;
const URL = process.env.MONGODB_URL;
const DB = process.env.MONGODB_DB;
// console.log(PWD);
export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USER}:${PWD}@${URL}/${DB}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
