import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/queries";
import { ImageModal } from "./_components/image-modal";

export const dynamic = "force-dynamic";

async function Images() {
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
            <ImageModal image={image}> 
            <div className="relative aspect-video bg-zinc-900">
              <img
                src={image.imageUrl}
                alt={`Image ${image.id}`}
                className="h-full w-full object-contain object-center"
              />
            </div>
            </ImageModal>
            <div className="text-center py-2 text-sm font-medium text-gray-700">
              {image.imageName || image.fileName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SignedOut>
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Phone Mockup */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl p-6">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-blue-900 rounded-[2.5rem] flex flex-col items-center justify-center">
                  {/* App Icon */}
                  <div className="w-16 h-16 bg-cyan-400 rounded-2xl mb-4 flex items-center justify-center">
                    <div className="w-8 h-10 bg-white rounded-sm"></div>
                  </div>
                  <div className="text-white text-sm font-medium">RELL1 Inventory</div>
                  <div className="text-gray-400 text-xs">Phone Inventory</div>
                </div>
              </div>
              {/* Phone Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Brand Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-cyan-400 rounded-xl flex items-center justify-center mr-3">
                <div className="w-6 h-7 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">RELL1</h1>
                <p className="text-gray-300 text-sm">Phone Inventory</p>
              </div>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Phone Inventory</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Upload Now
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the Real Time Phone Inventory Where you can upload your favorite Phones.
            </p>
            
            {/* Welcome Message */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Welcome to Phone Storage
              </h3>
            </div>
            
            {/* CTA Button */}
            <div className="space-y-4">
              <Link
                href="/sign-in"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <p className="text-gray-400 text-sm">Sign in to start managing your phone inventory</p>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-400/10 rounded-full blur-xl"></div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Header for signed in users */}
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-cyan-400 rounded-xl flex items-center justify-center mr-3">
                <div className="w-6 h-7 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">RELL1</h1>
                <p className="text-gray-300 text-sm">Phone Inventory</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Your Phone Collection</h2>
            <p className="text-gray-300">Manage and organize your phone inventory</p>
          </div>
          <Images/>
        </div>
      </SignedIn>
    </div>
  );
}