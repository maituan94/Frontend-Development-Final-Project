import express from'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dbConfig from './dbconfig.js'
import { db, validateFirestoreConnection } from './firebase/index.js'

import CustomerRouter from './routes/customer.route.js'
import GeneralRouter from './routes/general.route.js'
import ProductRouter from './routes/product.route.js'
import SupplierRouter from './routes/supplier.route.js'
import PurchaseRouter from './routes/purchase.route.js'
import SaleRouter from './routes/sale.route.js'

const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/api', CustomerRouter);
app.use('/api', GeneralRouter);
app.use('/api', ProductRouter);
app.use('/api', SupplierRouter);
app.use('/api', PurchaseRouter);
app.use('/api', SaleRouter);

/* This is creating a constant variable called CONNECTION_URL that is a string with the value of the
connection string to the database. */
const CONNECTION_URL = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}?retryWrites=true&w=majority`
/* This is setting the port to the value of the environment variable PORT or 4000 if the environment
variable PORT is not set. */
const PORT = process.env.PORT || 4000;

validateFirestoreConnection()

/* This is connecting to the database and then starting the server. */
mongoose.connect(CONNECTION_URL, { })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
