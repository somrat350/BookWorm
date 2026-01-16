import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { usersCollection } from "./dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Invalid password");

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          photoUrl: user.photoUrl,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.photoUrl = user.photoUrl;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        _id: token._id,
        name: token.name,
        email: token.email,
        role: token.role,
        photoUrl: token.photoUrl,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
