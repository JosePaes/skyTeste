const connection = (driver) => {
  driver.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@cluster0.fok5m.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connection;
