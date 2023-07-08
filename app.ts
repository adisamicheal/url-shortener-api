import express from "express";
import urlShortenerRoutes from "./routes/urlShortenerRoutes"
import connectToDatabase from "./utils/database";

const app = express();

connectToDatabase();

app.use(express.json());

app.use("/api/v1", urlShortenerRoutes)

const PORT = process.env.APP_PORT

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// mongodb username = admin
// mongodb password = kBTVYWP30hzba5TZ