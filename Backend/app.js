const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const errorMiddleware = require("./middleware/error")
// route imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order)
//middleware for error
app.use(errorMiddleware);
module.exports = app;
// server ki sari files
// app.use() middleware h phele ye chalega
// url hoga :- https://localhost:port/api/v1/user ya phit product uske bad hmmne kya banaya hai