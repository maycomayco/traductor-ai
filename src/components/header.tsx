import { SignInButton } from "@clerk/nextjs";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <h1 className="text-xl font-bold">TraductorAI</h1>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
