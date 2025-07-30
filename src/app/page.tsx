

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";
async function Images() {

//const mockUrl = ["https://tr.rbxcdn.com/30DAY-Avatar-0B6FE57B08B32CA517E6F1B01C7D5A62-Png/352/352/Avatar/Png/noFilter", 
//  "https://www.paramountshop.com/cdn/shop/files/spongebob-squarepants-handsome-squidward-life-size-standee-309957_grande.jpg?v=1733556648",
//  "https://a3dmf5xzqq.ufs.sh/f/JjoxSwTodBmpIImOlbMeTYzgH30d5mXS9QMKWskfpwcR7VhA",
//"https://a3dmf5xzqq.ufs.sh/f/JjoxSwTodBmp6xuQ8gZoYBhZ90jHAk7iCLwUuQztMbTrpSc4"];

//const images = mockUrl.map((url, index) => ({
//  id: index + 1,
 // url,
//})); 
const images = await getMyImages();

 return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Upload button area */}
      <div className="flex justify-end px-4 py-6">
        <UploadDialog />
      </div>

      {/* Image Grid */}
      <div className="flex flex-wrap justify-center gap-6 px-4 pb-10">
        {images.map((image) => (
          <div
            key={image.id}
            className="w-64 flex flex-col rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-video bg-zinc-900">
              <img
                src={image.imageUrl}
                alt={`Image ${image.id}`}
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div className="text-center py-2 text-sm font-medium text-gray-700">
              Image #{image.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
      <SignedIn>
        <div className="text-center text-3xl font-bold text-gray-800 pt-6 pb-2">
        
        </div>
          <Images/>
      </SignedIn>
        );
}