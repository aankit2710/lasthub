import { useExpressServer } from 'routing-controllers';
import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser';

import { SignUpController } from './src/controllers/user';
import { EnquiryController } from './src/controllers/enquiry';
import {connectDB} from './src/config/database';

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
  controllers: [SignUpController, EnquiryController] // we specify controllers we want to use
}).listen(3001, () => {
  connectDB();
  console.log(`server is up and running on 3001`);
 });