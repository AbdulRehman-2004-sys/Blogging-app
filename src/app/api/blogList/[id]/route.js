import { blogModel } from "@/lib/models/blogModel"
import { NextResponse } from "next/server"

import { writeFile } from "fs/promises";
import path from "path";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const desc = formData.get("desc");
    const category = formData.get("category");
    const author = formData.get("author");
    const isPublished = formData.get("isPublished") === "true";

    const coverImgFile = formData.get("coverImg");
    const authorImgFile = formData.get("authorImage");

    let coverImgUrl = null;
    let authorImageUrl = null;

    // Helper function to save files to public/uploads/
    const saveFile = async (file, fileNamePrefix) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${fileNamePrefix}_${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      return `/uploads/${fileName}`; // accessible from frontend
    };

    if (coverImgFile && typeof coverImgFile.name === "string") {
      coverImgUrl = await saveFile(coverImgFile, "cover");
    }

    if (authorImgFile && typeof authorImgFile.name === "string") {
      authorImageUrl = await saveFile(authorImgFile, "author");
    }

    const updateData = {
      title,
      desc,
      category,
      author,
      isPublished,
    };

    if (coverImgUrl) updateData.coverImg = coverImgUrl;
    if (authorImageUrl) updateData.authorImage = authorImageUrl;

    const updatedBlog = await blogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      });
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};



export const DELETE = async (req, { params }) => {
    try {
        const { id } = params;
        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ success: false, message: "Blog not found" });
        }

        return NextResponse.json({ success: true, message: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
};
