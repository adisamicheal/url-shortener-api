import mongoose from "mongoose";

export interface Url_Doc_Type {
  origin_Url: string; // redirect to this url
  shortned_Url_Id: string; //use the params as a search key
  clicks: number; // analytics for clicks
  //Dates is included in timestamp: true below (createdAt and updatedAt)
}

const url_Schema = new mongoose.Schema(
  {
    origin_Url: { type: String, required: true },
    shortned_Url_Id: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Shorten_Url_Model = mongoose.model<Url_Doc_Type>("url", url_Schema);

export default Shorten_Url_Model;
