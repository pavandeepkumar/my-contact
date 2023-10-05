const express = require('express');
const ErroeHandler = require('./middleware/ErroeHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/contacts", require('./routes/contactsRoute'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(ErroeHandler);
connectDB();


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})