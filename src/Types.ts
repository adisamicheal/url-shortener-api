import { Request, Response, Express } from "express";

export type Connect_To_Db_Type = () => Promise<string>;

export type Routes_Type = (app: Express) => void;

export interface Utils_Types {
  validate_Url: (value: string) => boolean;
}

export interface Shorten_Url_Handler_Types {
  Get_All_Urls: (
    req: Request,
    res: Response
  ) => Promise<Response<any, Record<string, any>>>;
  Create_Shorten_Url: (
    req: Request,
    res: Response
  ) => Promise<Response<any, Record<string, any>>>;
  Redirect_Url: (
    req: Request,
    res: Response
  ) => Promise<void | Response<any, Record<string, any>>>;
}

export interface Shorten_Url_Service_Types {
  Create_Url: (Orginal_Url: string, Shortend_Id: string) => Promise<any>;
  Get_All: () => Promise<any>;
  Get_Url: (target_Id: string) => Promise<any>;
}
