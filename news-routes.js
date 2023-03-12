const Router  = require("koa-router");
const bodyParser = require('koa-bodyparser');
const { News, news } = require("./News");
const router = new Router();

router.use(bodyParser());

// Create Route
router.post("/news", async (context) => {
    const body = context.request.body;

    newsObj = new News(body.id, body.date, body.title, body.description, body.text);
    news.push(newsObj);

    context.body = newsObj;
});

// Read Route 
router.get("/news", async (context) => {
    context.body = news;
});

// Read Route for id
router.get("/news/:id", async (context) => {
    const id = context.params.id;
    context.body = news[id];
});

// Update Route
router.put("/news/:id", async (context) => {
    const id = context.params.id
    const body = context.request.body
    
    const newsObj = news[id]
    newsObj.id = body.id;
    newsObj.date = body.date;
    newsObj.title = body.title;
    newsObj.description = body.description;
    newsObj.text = body.text;
    
    context.body = newsObj;
});

module.exports = router;