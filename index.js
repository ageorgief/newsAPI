const Koa = require("koa");
const json  = require("koa-json");
const newsRoutes = require('./routes/news');
const app = new Koa();
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27016/news')

//Json Prettier Middleware
app.use(json())

//News Routes Middleware
app.use(newsRoutes.routes());
app.use(newsRoutes.allowedMethods());

app.listen(3000, () => console.log('Server Started...'));