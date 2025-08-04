// app/api/comments/route.js

import { NextResponse } from "next/server";
import { ConnectDb } from "@/lib/config/db";
import { commentModel } from "@/lib/models/commentModel";
// Connect DB once
const db = async () => {
  await ConnectDb();
};
db();

// ===================== GET ALL COMMENTS =====================
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
    }

    const comments = await commentModel
      .find({ blog: blogId })
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
};

// ===================== POST A NEW COMMENT =====================

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { postId, name, email, comment } = body;

    if (!postId || !name || !email || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔥 This is the important part
    const newComment = await commentModel.create({
      blog: postId,  // ✅ model field is "blog"
      name,
      email,
      comment,
    });
    // console.log("Creating comment with:", {
    //   blog: postId,
    //   name,
    //   email,
    //   comment,
    // });

    return NextResponse.json(
      { success: true, message: "Comment posted!", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Comment Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
