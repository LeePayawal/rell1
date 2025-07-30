import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { desc, eq } from "drizzle-orm";

export async function getMyImages() {
const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new Error("Unauthorized");

      const images = await db.query.images .findMany({
        where: (model,{ eq }) => eq(model.userId, user.userId),
       orderBy: (model, {desc}) => desc(model.id),
      });
     
     
      return images;
}