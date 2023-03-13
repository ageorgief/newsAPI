const Koa = require("koa");
const json  = require("koa-json");
const bodyParser  = require('koa-bodyparser');
const newsRoutes = require('./routes/news');
const app = new Koa();
const mongoose = require('mongoose');

const Router  = require("koa-router");
const router = new Router();

mongoose.connect('mongodb://0.0.0.0:27016/news')
// const {MongoClient} = require("mongodb");
// const url = "mongodb://0.0.0.0:27016";

// const client = new MongoClient(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// client.connect( err => {
//     if(err) {
//         console.log("Error!!!!!!!!!!")
//         console.log(err);
//         process.exit(-1);
//     }
//     console.log("Connected!!!!!!")
// });

// const news = client.db('news_db').collection('news');
// const res = async() => {
//     const cursor = await news.find();
//     console.log(cursor.toArray());
//     return cursor.toArray();
// };




router.get("/bsd", async (context) => {
    context.body = await res();
});
router.use(bodyParser());
//Json Prettier Middleware
app.use(json())
app.use(router.routes());
//News Routes Middleware
app.use(newsRoutes.routes());
app.use(newsRoutes.allowedMethods());


app.listen(3000, () => console.log('Server Started...'));