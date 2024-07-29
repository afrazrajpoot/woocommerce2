import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import User from "@/models/userModel";
import { connection } from "@/dbConfig/dbConfig";

connection();

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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { name, email, image } = user;
        console.log("User signed in:", user);
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          const newUser = new User({
            fullName: name,
            email: email,
            img: image,
          });
          await newUser.save();
        } else {
          console.log("User already exists:", existingUser);
        }
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
