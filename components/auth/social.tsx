"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

  const onClick = ( provider: "google" | "github" ) => {
    signIn( provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT } );
  }

  return (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="custom"
          size="lg"
          className="flex items-center space-x-2"
          onClick={() => onClick( "google" )}
        >
          <FcGoogle />
          <span>Google</span>
        </Button>
        <Button
          variant="custom"
          size="lg"
          className="flex items-center space-x-2"
          onClick={() => onClick( "github" )}

        >
          <FaGithub />
          <span>Github</span>
        </Button>
      </div>
    </div>
  )
}
