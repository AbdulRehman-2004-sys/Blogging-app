import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogModel',
      required: true,
    },
    name: String,
    email: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// ❌ Avoid reusing old model
// ✅ Force overwrite to avoid using outdated schema
export const commentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
