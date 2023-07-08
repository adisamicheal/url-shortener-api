import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUrl {
  urlId: string;
  url: string;
  shortUrl: string;
  clicks: number;
  date: string;
}

const urlSchema = new Schema<IUrl>({
  urlId: { type: String, required: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, required: true , default: 0 },
  // date: { type: String, default: Date.now }
});

export default mongoose.model("url", urlSchema);