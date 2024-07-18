import mongoose from "mongoose";

const AlertHandlerSchema = new mongoose.Schema({
  type: String,
  address: String,
});
export default mongoose.models.AlertHandler || mongoose.model("AlertHandler", AlertHandlerSchema);
