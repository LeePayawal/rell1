"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
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
    brand: string | null;
    price: number | null;
    description: string | null;
  };
  children: React.ReactNode;
}

export function ImageModal({ image, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <div>
      <div 
        onClick={() => setIsOpen(true)} 
        className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      >
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-h-[90vh] min-w-[90vw] overflow-hidden p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border-slate-700">
          <div className="flex h-full flex-col md:flex-row">
            {/* Image Container */}
            <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <div className="relative max-w-full max-h-full">
                <img
                  src={image.imageUrl}
                  alt={String(image.id)}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-slate-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-lg pointer-events-none"></div>
              </div>
            </div>

            {/* Details Container */}
            <div className="flex w-full flex-col md:w-80 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700">
              <DialogHeader className="border-b border-slate-700 p-6 bg-slate-800/30">
                <DialogTitle className="text-center text-white text-xl font-semibold">
                  {image.imageName || image.fileName}
                </DialogTitle>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center mr-2">
                    <div className="w-4 h-5 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-cyan-400 text-sm font-medium">RELL1 Inventory</span>
                </div>
              </DialogHeader>

              <div className="flex flex-col p-6 space-y-6 flex-1">
                {/* Uploader Info */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <span className="text-sm font-medium text-cyan-400 block mb-2">
                    📱 Device Info
                  </span>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Uploaded by:</span>
                      <span className="text-white font-medium">{user?.firstName || 'User'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Date:</span>
                      <span className="text-white">{new Date(image.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Device Specifications */}
                {(image.brand || image.price !== null) && (
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <span className="text-sm font-medium text-blue-400 block mb-3">
                      🔧 Specifications
                    </span>
                    <div className="space-y-3">
                      {image.brand && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Brand:</span>
                          <span className="text-white font-medium bg-slate-600/50 px-2 py-1 rounded text-sm">
                            {image.brand}
                          </span>
                        </div>
                      )}
                      {image.price !== null && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Price:</span>
                          <span className="text-green-400 font-bold text-lg">
                            ₱ {image.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                {image.description && (
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <span className="text-sm font-medium text-purple-400 block mb-2">
                      📝 Description
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-slate-700">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50"
                      onClick={() => window.open(image.imageUrl, '_blank')}
                    >
                      🔗 Open Full Size
                    </Button>
                    <DeleteButton idAsNumber={image.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogClose className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
            ✕
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
