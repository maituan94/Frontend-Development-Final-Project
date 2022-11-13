import express from 'express';
import { getProvinces, login } from '../controllers/general.controler.js';

const GeneralRouter = express.Router();

//provinces route
GeneralRouter.get('/provinces', getProvinces);

//provinces route
GeneralRouter.post('/login', login);

export default GeneralRouter
