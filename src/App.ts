import express from "express";
import routes from "./Routes";
import dotenv from "dotenv";
import connect_To_Db from "./Provider/Db.Provider";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT;

app.listen(PORT, async () => {
  console.log(await connect_To_Db());
  console.log(`Running on Localhost:${PORT}`);
  routes(app);
});
