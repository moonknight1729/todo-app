const express=require('express');
const server=express();
const {PORT}=require('./config/index')
const Router=require('./routes/index')

const db=require('./utils/db');
server.use(express.json())

Router(server);
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
    