import { sendRequest } from "@/utils/api";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }: any) {
      if (trigger === "signIn" && account?.provider === "github") {
        // Khi login vào github thành công trả về token - jwt
        // gan them 1 tham so address vào token.
        // OBJ Token dc tạo ra - lưu bằng cookie ở Client
        //token.address = "hoi dan IT";

        // Sau khi lụm dc Token (co user kèm) từ Provider thì thực hiện việc bắn API về back
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8000/api/v1/auth/social-media",
          method: "POST",
          body: { type: "GITHUB", username: user.email },
        });
        // Kết hop thông tin back gửi về để nối vào token gửi lên session dùng các nơi khác ở Next
        if (res.data) {
          token.access_token = res.data?.access_token;
          token.refresh_token = res.data.refresh_token;
          token.user = res.data.user;
        }
      }
      return token;
    },
    //@ts-ignore
    session({ session, token, user }) {
      //@ts-ignore
      // gắn token vào session
      //Token dc cookie gửi về session - giải mã và lưu vao Ram
      //session.address = token.address;
      // Gắn token (có data từ back lun) vô session
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
