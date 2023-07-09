import UrlModel from "../models/urlModel";
import shortid from "shortid"
import utils from "../utils/util"

export const getAllSavedUrls = async (req: any, res: any, next: any) => {
  try {
    const url = await UrlModel.find();
    
    if (!url) {
      return res.status(404).json({message: "No URLs found"});
    }
    return res.status(200).json({url});
  } catch (error) {
    if (error instanceof Error) {
      error.message ? console.error(error.message) : console.error(error);
    }
  }
}

export const shortenURL = async (req: any, res: any, next: any) => {
  const { url } = req.body;
  const base = process.env.API_URL;

  const urlId = shortid.generate();
  if (utils.validateUrl(url)) {
    try {
      let urlVal = await UrlModel.findOne({ url });
      if (urlVal) {
        return res.json(urlVal);
      }
      const shortUrl = `${base}/${urlId}`;

      urlVal = new UrlModel({
        urlId,
        url,
        shortUrl,
        // date: new Date()
      });

      await urlVal.save();
      return res.json(urlVal);
    } catch (error) {
      if (error instanceof Error) {
        error.message ? console.error(error.message) : console.error(error);
      }
      res.status(500).json({message: "Server Error"})
    }
  } else {
    res.status(400).json({message: "Invalid Url"});
  }
};

export const redirectUrl = async (req: any, res: any, next: any) => {
  try {
    const urlVal = await UrlModel.findOne({ urlId: req.params.urlId})

    if (urlVal) {
      urlVal.clicks+=1;
      urlVal.save();
      return res.redirect(urlVal.url);
    }
    return res.status(404).json({message: "URL not found"})
    
  } catch (error) {
    if (error instanceof Error) {
      error.message ? console.error(error.message) : console.error(error);
    }
    return res.status(500).json({message: "Server Error"})
  }
}