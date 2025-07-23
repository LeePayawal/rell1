import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

export function TopNav(){
    return(
      <nav className="flex w-full items-center justify-between border-b border-zinc-800 bg-black p-4 font-semibold text-white">
        <div >RELL1</div>
        <div>
            <SignedOut>
                <div className="cursor-pointer">
                   
                <SignInButton />   
                </div>
            </SignedOut>
            <SignedIn>
               { /* <SignOutButton /> */}
               <UserButton/>
            </SignedIn>
        </div>
      </nav>
    );

}
  
