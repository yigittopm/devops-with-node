const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

// REDIS Config
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = new redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
redisClient.connect();
const app = express();
const port = process.env.PORT || 3000;

// Mongodb url
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// Connect to mongodb with mongoose
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connect to mongodb.."))
    .catch((err) => {
      console.log(err);
      // Retry connect to db after 4000 milisecond
      setTimeout(connectWithRetry, 4000);
    });
};

connectWithRetry();

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      resave: false,
      saveUninitialized: false,
      secure: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

// Router
// Post Route
app.use("/posts", require("./routes/post.route"));
app.use("/users", require("./routes/user.route"));

app.listen(port, () => console.log(`Listening on port ${port}`));
