import express from "express";
import { getAllSavedUrls, shortenURL, redirectUrl } from "../controllers/urlController";

const urlShortenerRoutes = express.Router();

urlShortenerRoutes.get('/all', getAllSavedUrls);
urlShortenerRoutes.post('/shorten-url', shortenURL);
urlShortenerRoutes.get('/:urlId', redirectUrl);

export default urlShortenerRoutes;