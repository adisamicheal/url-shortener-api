import { Express } from "express";
import Shorten_Url_Handler from "./Controllers/Su.Controller";
import { Routes_Type } from "./Types";

const routes: Routes_Type = (app: Express) => {
  /*Api-Get*/
  app.get("/api/get-all", Shorten_Url_Handler.Get_All_Urls); //get all shortened urls (Probably should secure)
  app.get("/:url_Id", Shorten_Url_Handler.Redirect_Url); //redirect with a url

  /*Api-Posts*/
  app.post("/api/shorten-url", Shorten_Url_Handler.Create_Shorten_Url); //create a shorten url
};

export default routes;
