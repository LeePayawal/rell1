

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";

async function Images(){

const mockUrl = ["https://tr.rbxcdn.com/30DAY-Avatar-0B6FE57B08B32CA517E6F1B01C7D5A62-Png/352/352/Avatar/Png/noFilter", 
  "https://e1.pngegg.com/pngimages/341/966/png-clipart-black-resourcesforbitches-marlboro-cigarette-box-thumbnail.png",
  "https://a3dmf5xzqq.ufs.sh/f/JjoxSwTodBmpIImOlbMeTYzgH30d5mXS9QMKWskfpwcR7VhA",
"https://a3dmf5xzqq.ufs.sh/f/JjoxSwTodBmp6xuQ8gZoYBhZ90jHAk7iCLwUuQztMbTrpSc4"];

const images = mockUrl.map((url, index) => ({
  id: index + 1,
  url,
})); 

  return (
    <div>
      <div className="flex justify-end p-4">
         <UploadDialog />
      </div>
  <div className="flex flex-wrap justify-center gap-6 p-4">
    {images.map((image) => (
    <div key = {image.id} className=" flex w-64 flex-col">
      <div className="relative aspect-video bg-zinc-900">
     <img 
     src ={image.url} 
     alt={`Image ${image.id}`} 
     className="h-full w-full object-contain object-top"
     />
     </div>
      <div className="texr-center">{image.id} </div>
    </div>
  ))}
  </div>
  </div>
  );
}
export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2x1">
          Please Sign In Above To Continue!!! 
        </div>
      </SignedOut>
      <SignedIn>
        <div className="h-full w-full text-center text-2x1">
          Welcome Back! 
          <Images/>
        </div>
      </SignedIn>
   </main>
  );
}
