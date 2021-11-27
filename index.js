const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

//config env
dotenv.config()

//connect to Db
mongoose.connect(process.env.DB_CONNECT, () =>{
    console.log('Db Connected')
})

//json
app.use(express.json());

//initializing routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

//listening port
app.listen(process.env.PORT, () =>{
    console.log('backend server is running...')
})