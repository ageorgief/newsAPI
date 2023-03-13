const Router = require("koa-router");
const router = new Router();

const bodyParser = require('koa-bodyparser');

const News = require('../models/news');
const { default: mongoose } = require("mongoose");

router.use(bodyParser());

// Create Route
router.post("/news", async (context) => {
    const body = context.request.body

    const news = new News({
        _id: new mongoose.Types.ObjectId,
        date: body.date,
        title: body.title,
        description: body.description,
        text: body.text
    });

    await news.save()
        .then(result => {
            console.log(result);
            context.response.status = 201;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 400;
        });
});

// Read Route 
router.get("/news", async (context) => {
    await News.find()
        .exec()
        .then(doc => {
            console.log(doc);
            context.response.status = 200;
            context.body = doc;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 400;
        });
});


// Read Route for id
router.get("/news/:id", async (context) => {
    const id = context.params.id;

    await News.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            context.response.status = 200;
            context.body = doc;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 400;
        });
});


// Update Route
router.put("/news/:id", async (context) => {
    const id = context.params.id
    const updateOps = context.request.body;

    await News.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            context.response.status = 200;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 400;
        });
});

// Delete Route
router.delete("/news/:id", async (context) => {
    const id = context.params.id

    await News.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            context.response.status = 200;
        })
        .catch(err => {
            console.log(err);
            context.response.status = 400;
        });
});

module.exports = router;