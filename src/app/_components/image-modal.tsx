"use client";
import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DeleteButton } from "./delete-button";

interface ImageModalProps {
    image: {
        id: number;
        fileName: string | null;
        imageName: string | null; 
        imageUrl: string;
        userId: string;
        createdAt: Date;
    };
    children: React.ReactNode;
}

 export function ImageModal({ image, children  }: ImageModalProps ) {
 const [isOpen, setIsOpen] = useState(false);
 const { user } = useUser();

 // const uploaderInfo = (await ( await clerkClient()).users.getUser(image.userId))
 //.fullName;
    return (
       <div>
        <div onClick={() => setIsOpen(true)} className="cursor-pointer"> 
            {children} 
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-h-[90vh] min-w-[90vw] overflow-hidden p-0">
            <div className = "flex h-full flex-col md:flex-row "> 
              {/*Image Container */}
              <div className="flex flex-1 items-center justify-center  bg-black p-4 "> 
               <img src = {image.imageUrl} 
                alt={String(image.id)} 
                className ="max-h-full max-w-full object-contain"
                />
              </div>
              {/*Details Container */}
              <div className="flex w-full flex-col  md:w-80"> 
          <DialogHeader className="border-b p-4">
            <DialogTitle className= "text-center">
              {image.imageName || image.fileName}
              </DialogTitle>
          </DialogHeader> 
          <div className="flex flex-col p-4 space-y-4 flex-1"> 
           <div className="flex flex-col">
               <span className="text-sm font-medium text-gray-600">
                Uploaded By:
                </span>
               <span>Uploader Name</span>
           </div>

             <div className="flex flex-col">
               <span className="text-sm font-medium text-gray-600">
                Created At:
                </span>
               <span> {new Date(image.createdAt).toLocaleDateString()}
                </span>
           </div>
          <div className=""> 
            <DeleteButton idAsNumber={image.id}/>
          </div>
          </div>
          </div>
          </div>
        </DialogContent>
        </Dialog>
    </div>
    );

}