class News {
    constructor(id, date, title, description, text){
        this.id = id;
        this.date = new Date(date);
        this.title = title;
        this.description = description;
        this.text = text;
    }
}

const news = [];

module.exports = {
    News,
    news
}