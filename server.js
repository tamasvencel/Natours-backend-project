////////////
// SERVER //
////////////
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const path = "./config.env";
dotenv.config({ path: path });
const app = require("./app");

console.log(dotenv.config());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
