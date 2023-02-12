const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("\nDatabase connection successful.");
      console.log("Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });

function signalHandler() {
  mongoose.disconnect();
  console.log("\nDatabase disconnected\n");
}
process.on("SIGINT", signalHandler); ///// DDD
