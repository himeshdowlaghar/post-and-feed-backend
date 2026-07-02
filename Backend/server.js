const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/db/connection");

const PORT = process.env.PORT || 3456;

connectDB();
app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});