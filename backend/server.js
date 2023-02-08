const express = require('express');
const { connect } = require('./DB/connect');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(3000, async () => {
    console.log('listening to port 3000');
    await connect();
});