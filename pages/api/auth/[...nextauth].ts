import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

//next-aut config
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        }); //the collection in db

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPass) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/" }, // redirection page
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuth(authOptions);
