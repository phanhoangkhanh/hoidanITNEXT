import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // THEM THAM SO CHO TYPESCRIPT

    access_token: string;
    refresh_token: string;
    user: {
      /** The user's postal address. */
      address: string;
    } & DefaultSession["user"];
  }
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  isVerify: boolean;
  type: string;
  role: string;
}

declare module "next-auth/jwt" {
  // Định nghĩa type cho JWT - chính là cho token - KHop voi body API sẽ gọi để kéo token vào sessionback
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}
