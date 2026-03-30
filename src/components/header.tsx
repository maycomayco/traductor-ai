import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <header className="bg-[#1a1a1a] border-b-2 border-[#1a1a1a] h-14 flex items-center justify-between px-8 shrink-0">
      <h1 className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#f2ede4]">
        Traductor<span className="text-[#4a90d9]">AI</span>
      </h1>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button
              type="button"
              className="font-mono text-[10px] font-bold tracking-[2px] uppercase text-[#f2ede4] opacity-60 hover:opacity-100 transition-opacity"
            >
              [ iniciar sesión ]
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 border-2 border-[#4a90d9] rounded-none",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  )
}
