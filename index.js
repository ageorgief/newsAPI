const Koa = require("koa");
const JSON  = require("koa-json");
const BodyParser  = require('koa-bodyparser');
const newsRoutes = require('./news-routes');
const app = new Koa();

//Json Prettier Middleware
app.use(JSON())

//News Routes Middleware
app.use(newsRoutes.routes());
app.use(newsRoutes.allowedMethods());


app.listen(3000, () => console.log('Server Started...'));