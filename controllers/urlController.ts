import UrlModel from "../models/urlModel";
import shortid from "shortid"
import utils from "../utils/util"

export const getAllSavedUrls = async (req: any, res: any, next: any) => {
  console.log('called');

  const url = await UrlModel.find();
  
  if (!url) {
    return res.status(404).json({message: "No urls found"});
  }
  console.log(url);
  return res.status(200).json({url});
}

export const shortenURL = async (req: any, res: any, next: any) => {
  console.log("url shorten request", req.body.url);
  const { url } = req.body;
  const base = process.env.API_URL;

  const urlId = shortid.generate();
  if (utils.validateUrl(url)) {
    try {
      let urlVal = await UrlModel.findOne({ url });
      if (urlVal) {
        console.log("reurn here?", url);
        
        return res.json(url);
      }
      console.log("reurn here instead?", url);
      const shortUrl = `${base}/${urlId}`;

      urlVal = new UrlModel({
        urlId,
        url,
        shortUrl,
        // date: new Date()
      });

      console.log("url value", urlVal);
      

      await urlVal.save();
      return res.json(urlVal);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Server Error"})
    }
  } else {
    res.status(400).json({message: "Invalid Url"});
  }
};

export const redirectUrl = async (req: any, res: any, next: any) => {
  console.log('gets here', req.params);
  
  try {
    const urlVal = await UrlModel.findOne({ urlId: req.params.urlId})
    console.log('urlVal', urlVal);

    if (urlVal) {
      urlVal.clicks+=1;
      urlVal.save();
      return res.redirect(urlVal.url);
    }
    return res.status(404).json({message: "Not found"})
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Server Error"})
  }
}