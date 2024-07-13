import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // console.log(user, "user google");
        // Handle sign-in logic here
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        return url.startsWith(baseUrl) ? url : baseUrl;
      } catch (error) {
        console.error("Error during redirect:", error);
        return baseUrl;
      }
    },
    async session({ session, token, user }) {
      try {
        // Handle session logic here
        return session;
      } catch (error) {
        console.error("Error during session:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
