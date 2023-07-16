import express from "express";
import routes from "./Routes";
import connectToDatabase from "./Provider/Db.Provider";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(await connectToDatabase());
  console.log(`Running on Localhost:${PORT}`);
  routes(app);
});
