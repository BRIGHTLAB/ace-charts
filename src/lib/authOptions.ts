import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.BASE_URL}/admin/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    // error:
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user && account) {
        return {
          id: user.id,
          token: user.token,
          refresh_token: user.refresh_token,
          expiry: user?.expiry,
        };
      }
      return token;
    },

    async session({ token }: any) {
      return token;
    },
  },
};
