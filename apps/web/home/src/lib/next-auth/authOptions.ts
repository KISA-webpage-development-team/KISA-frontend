// `next-auth/authOptions.ts`
// : configuration options to use next-auth library for authentication

import GoogleProvider from "next-auth/providers/google";

import client from "@/lib/axios/client";
import signToken from "@/lib/jsonwebtoken/signToken";

import { GOOGLE_ID, GOOGLE_SECRET, BACKEND_URL } from "@/constants/env";
import { NEXTAUTH_SECRET } from "./env"; // NOTE: for organization, env variable only for next-auth is separated

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.token = token.accessToken;
      // session.name = user.name;
      return session;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const access_token = await signToken(user?.email as string);
        token.accessToken = access_token;
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile, credentials, userinfo }) {
      try {
        const res = await client.get(
          `${BACKEND_URL}/auth/userExists/${profile.email}`
        );

        if (res.status === 200) {
          const fullname = res.data?.fullname;
          user.name = fullname;
          user.birthday = profile?.birthday;

          return true;
        }
        return false; // if not 200, something went wrong
      } catch (error) {
        if (profile.email.endsWith("umich.edu")) {
          return "/signup";
        }

        // if not, redirect to /signup page to create a new user

        return "/signin";
      }
    },
    async redirect({ url, baseUrl }) {
      // [TEST: middleware]
      if (url.includes("/signin")) {
        // /signin페이지로 로그인할시에, callbackUrl을 붙여서 리다이렉트
        let callbackUrl = url.split("callbackUrl=")[1];

        if (callbackUrl === undefined) {
          return `${baseUrl}/signin`;
        }

        return `${decodeURIComponent(callbackUrl)}`;
      }

      // Allows relative callback URLs
      else if (url.split("/")[3] === "signup") return baseUrl;
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  secret: NEXTAUTH_SECRET,
};

export default authOptions;
