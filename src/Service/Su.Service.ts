import Shorten_Url_Model, { Url_Doc_Type } from "../models/Su.Model";

const Shorten_Url_Service = {
  Create_Url: async (Orginal_Url: string, Shortend_Id: string) => {
    try {
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
