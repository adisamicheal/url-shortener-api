import { Shorten_Url_Service_Types } from "../Types";
import Shorten_Url_Model, { Url_Doc_Type } from "../models/Su.Model";

const Shorten_Url_Service: Shorten_Url_Service_Types = {
  Create_Url: async (Orginal_Url: string, Shortend_Id: string) => {
    try {
      const recycle_Url: [{}, Url_Doc_Type][] | any =
        await Shorten_Url_Model.find({ origin_Url: Orginal_Url });
      if (recycle_Url) return `localhost:3000/${recycle_Url.shortned_Url_Id}`; //save db space by using already used urls
      await Shorten_Url_Model.create({
        origin_Url: Orginal_Url,
        shortned_Url_Id: Shortend_Id,
        clicks: 0,
      });
      return `localhost:3000/${Shortend_Id}`;
    } catch (e: any) {
      return e.message;
    }
  },
  Get_All: async () => {
    try {
      return await Shorten_Url_Model.find().lean();
    } catch (e: any) {
      return e.message;
    }
  },
  Get_Url: async (target_Id: string) => {
    try {
      const redirect_Url: Url_Doc_Type | null = await Shorten_Url_Model.findOne(
        {
          shortned_Url_Id: target_Id,
        }
      ).lean();
      if (!redirect_Url) return undefined; //makes sure a url does infact exist

      const add_Click = redirect_Url.clicks++;

      await Shorten_Url_Model.updateOne(
        { shortned_Url_Id: target_Id },
        { clicks: add_Click }
      ); //Increases Clicks

      return redirect_Url.origin_Url;
    } catch (e: any) {
      return e.message;
    }
  },
};

export default Shorten_Url_Service;
