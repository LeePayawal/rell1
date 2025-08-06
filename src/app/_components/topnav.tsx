"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Smartphone, Menu, X } from "lucide-react";
import { useState } from "react";

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navigation */}
      <nav className="relative w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-full">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    RELL1
                  </span>
                  <span className="text-xs text-slate-400 -mt-1 hidden sm:block">
                    Phone Inventory
                  </span>
                </div>
              </div>
            </div>



            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <div className="flex items-center space-x-3">
                  <SignInButton>
                    <button className="relative px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative px-6 py-2 bg-slate-900 rounded-lg text-sm font-semibold text-white group-hover:bg-slate-800 transition duration-300">
                        Get Started
                      </div>
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-sm text-slate-400">
                    Welcome back
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-40"></div>
                    <div className="relative">
                      <UserButton 
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-10 h-10 border-2 border-cyan-400/50",
                            userButtonPopoverCard: "bg-slate-900 border border-slate-700",
                            userButtonPopoverText: "text-slate-200"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </SignedIn>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl z-50">
            <div className="px-4 py-6 space-y-4">
              <SignedOut>
                <div className="pt-4 border-t border-slate-700">
                  <SignInButton>
                    <button className="w-full text-left py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Background Section with Phone Images */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}></div>
        
        {/* Phone Mockups */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-auto px-4">
            {/* Main Phone */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-slate-900 rounded-3xl p-2 shadow-2xl border border-slate-700/50">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-64 h-96 relative border border-slate-600/30">
                    {/* Phone Screen Content */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-full"></div>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">RELL1 Inventory</div>
                          <div className="text-slate-400 text-xs">Phone Inventory</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-700 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-slate-400 text-xs">75% Complete</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-6">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="aspect-square bg-slate-700/50 rounded-lg border border-slate-600/30"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Phone */}
            <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-60 rotate-12 scale-75">
              <div className="bg-slate-800 rounded-3xl p-2 shadow-xl border border-slate-700/30">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-4 w-48 h-72 relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-600 rounded-full"></div>
                  <div className="mt-6 space-y-3">
                    <div className="h-1.5 bg-slate-600 rounded-full w-3/4"></div>
                    <div className="h-1.5 bg-slate-600 rounded-full w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square bg-slate-600/40 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone */}
            <div className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 opacity-60 -rotate-12 scale-75">
              <div className="bg-slate-800 rounded-3xl p-2 shadow-xl border border-slate-700/30">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-4 w-48 h-72 relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-600 rounded-full"></div>
                  <div className="mt-6 space-y-3">
                    <div className="h-1.5 bg-slate-600 rounded-full w-2/3"></div>
                    <div className="h-1.5 bg-slate-600 rounded-full w-3/4"></div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square bg-slate-600/40 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-30 flex items-center justify-center min-h-screen pt-20">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Phone Inventory
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Upload Now
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the Real Time Phone Inventory Where you can upload your favorite Phones.
            </p>
            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignInButton mode="modal">
                  <button className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative px-8 py-4 bg-slate-900 rounded-xl text-lg font-semibold text-white group-hover:bg-slate-800 transition duration-300">
                      Start Now
                    </div>
                  </button>
                </SignInButton>
                <button className="px-8 py-4 text-lg font-semibold text-slate-300 hover:text-white border border-slate-600 rounded-xl hover:border-slate-500 transition duration-300">
                  Learn More
                </button>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="text-2xl text-cyan-400 font-semibold">
                Welcome to Phone Storage
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-cyan-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-bounce" style={{animationDelay: '0.5s', animationDuration: '6s'}}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </>
  );
}