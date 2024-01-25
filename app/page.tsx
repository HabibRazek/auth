import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],

})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center text-center ">
      <div className="space-y-6">
        <h1 className={cn("text-4xl text-gray-700 font-semibold",
          font.className,
        )}>
          Authentication ✅
        </h1>
        <p className="text-gray-700 text-lg ">This is a simple authentication service </p>
        <div>
          <LoginButton>
            <Button variant="custom" size="lg"> Sign in </Button>
          </LoginButton>
        </div>

      </div>

    </main>
  )
}
