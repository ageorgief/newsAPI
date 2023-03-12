const Router  = require("koa-router");
const bodyParser = require('koa-bodyparser');
const { News, news } = require("./News");
const router = new Router();

router.use(bodyParser());

//Read Route for id
router.get("/news/:id", async (context) => {
    const id = context.params.id;
    context.body = news[id];
});

//Create Route
router.post("/news", async (context) => {
    const body = context.request.body;

    newsObj = new News(body.id, body.date, body.title, body.description, body.text);
    news.push(newsObj);

    context.body = newsObj;
})

//Read Route 
router.get("/news", async (context) => {
    context.body = news;
});

module.exports = router;