import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
import { ConnectDb } from "@/lib/config/db";
import { blogModel } from "@/lib/models/blogModel";

const db = async () => {
    await ConnectDb();
}
db();

export const GET = async () => {
  try {
    const blogs = await blogModel.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
};

export async function POST(request) {

    try {
        const formData = await request.formData();
        console.log("Received fields:", [...formData.entries()]);

        // Validate ALL required fields (including images)
        const requiredFields = ['title', 'desc', 'category', 'author', 'image', 'authorImage'];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }


        // Get both image files
        const blogImage = formData.get('image');
        const authorImage = formData.get('authorImage');

        // Validate they are actual files (not strings)
        if (typeof blogImage === 'string' || typeof authorImage === 'string') {
            return NextResponse.json(
                { error: 'Image files are required' },
                { status: 400 }
            );
        }
        // Process BOTH images
        const timeStamps = Date.now();

        // 1. Handle Blog Cover Image
        const imageByteData = await blogImage.arrayBuffer();
        const buffer = Buffer.from(imageByteData)
        const path = `./public/images/${timeStamps}_${blogImage.name}`;
        await writeFile(path, buffer);
        const imgURL = `/images/${timeStamps}_${blogImage.name}`

        // 2. Handle Author Image (REQUIRED)
        const authorImageByteData = await authorImage.arrayBuffer();
        const authorImageBuffer = Buffer.from(authorImageByteData);
        const authorImagePath = `./public/author/${timeStamps}_${authorImage.name}`;
        await writeFile(authorImagePath, authorImageBuffer);
        const authorImageURL = `/author/${timeStamps}_${authorImage.name}`;

        // Save to MongoDB
        await blogModel.create({
            title: formData.get('title'),
            desc: formData.get('desc'),
            category: formData.get('category'),
            author: formData.get('author'),
            img: imgURL,
            authorImg: authorImageURL
        });
        console.log("Blog saved")

        return NextResponse.json(
            { success: true, message: 'Blog saved!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

}