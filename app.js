const Koa = require("koa");
const json  = require("koa-json");
const newsRoutes = require('./routes/news');
const app = new Koa();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

//Json Prettier Middleware
app.use(json())

//News Routes Middleware
app.use(newsRoutes.routes());
app.use(newsRoutes.allowedMethods());

app.listen(3000, () => console.log('Server Started...'));