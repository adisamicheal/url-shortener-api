import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Shorten_Url_Service from "../Service/Su.Service";
import { Shorten_Url_Handler_Types } from "../Types";

const Shorten_Url_Handler: Shorten_Url_Handler_Types = {
  Get_All_Urls: async (req: Request, res: Response) => {
    try {
      return res.send(`${await Shorten_Url_Service.Get_All()}`);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  },
  Create_Shorten_Url: async (req: Request, res: Response) => {
    try {
      const target_Url: string = req.body.url;
      /*verify url const:boolean checked_Url
      if(!checked_Url)return res.status(403).send("Invalid Url")*/
      const redirect_Id: string = nanoid(7);

      return res.send(
        await Shorten_Url_Service.Create_Url(target_Url as string, redirect_Id)
      );
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  },
  Redirect_Url: async (req: Request, res: Response) => {
    try {
      const target_Id: string = req.params.url_Id; //get the id from the params of the url

      const redirect_Url: string = await Shorten_Url_Service.Get_Url(target_Id);
      if (!redirect_Url) return res.status(404).send("Invalid Url"); //if undefined return error

      return res.redirect(redirect_Url); //return and redirect to url
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  },
};

export default Shorten_Url_Handler;
