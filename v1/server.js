const express=require('express');
const server=express();
const {PORT}=require('./config/index')
const Router=require('./routes/index')


Router(server);
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
    