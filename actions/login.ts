"use server";
import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid credentials !" }
  }

  const { email, password } = validateFields.data;



  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email){
    return { error: "Invalid credentials !" }
  }

  if (!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email,);

    await sendVerificationEmail(verificationToken.email,verificationToken.token);

    return{
      success:"Confirmation email sent !",
    }
  }


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login success !" }

  } catch (err) {

    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials !" }
        default:
          return { error: "Something went wrong !" }
      }
    }
    throw err;

  }
};