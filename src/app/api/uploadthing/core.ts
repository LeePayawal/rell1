import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        imageName: z.string().min(5),
        brand: z.string().min(1),
        price: z.string().min(1), // still comes as string from form
        description: z.string().min(5),
      })
    )
    .middleware(async ({ req, input }) => {
      const user = await auth();

      if (!user.userId) throw new UploadThingError("Unauthorized");

      return {
        userId: user.userId,
        ...input, // imageName, brand, price, description
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url:", file.ufsUrl);

      await db.insert(images).values({
        fileName: file.name,
        imageName: metadata.imageName,
        imageUrl: file.ufsUrl,
        userId: metadata.userId,
        brand: metadata.brand,
        price: parseInt(metadata.price, 10), // store as integer
        description: metadata.description,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
