import { sendRequest } from "@/utils/api";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Password } from "@mui/icons-material";
import type { NextAuthOptions } from "next-auth";
import { AuthOptions } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NO_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here - CREDENTIAL TRUC TIEP
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "ĐĂNG NHẬP",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Tên đăng nhập",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8000/api/v1/auth/login",
          method: "POST",
          body: {
            username: credentials?.username,
            password: credentials?.password,

            // QUAN TRONG - KHI SAI THÌ KO CHUYEN TRANG
            //     usename: "admin@gmail.com",
            //    password: "123456",
          },
        });

        // const res = await fetch('http://localhost:8000/api/v1/auth/login',{
        //   method: 'POST',
        //   headers: { "Content-Type": "application/json" },
        //   body:JSON.stringify({
        //     username: "admin@gmail.com",
        //     password: "123456"
        //   })
        // })

        // If no error and we have user data, return it
        if (res && res.data) {
          return res.data as any;
        } else {
          // Return null if user data could not be retrieved
          //return null;
          // lấy error ném trả từ backend về
          throw new Error(res?.message as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }: any) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        // Khi login vào github thành công trả về token - jwt
        // gan THỬ thêm 1 tham so address vào token.
        // OBJ Token dc tạo ra - lưu bằng cookie ở Client
        //token.address = "hoi dan IT";

        // Sau khi lụm dc Token (co USER kèm) từ Provider thì thực hiện việc bắn API về back
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8000/api/v1/auth/social-media",
          method: "POST",
          body: {
            type: account?.provider?.toLocaleUpperCase(), // github viết hoa cho đúng chuẩn
            username: user.email,
          },
        });
        // Kết hop thông tin back gửi về để nối vào token gửi lên session dùng các nơi khác ở Next
        if (res.data) {
          token.access_token = res.data?.access_token;
          token.refresh_token = res.data.refresh_token;
          token.user = res.data.user;
        }
      }

      // LOGIN TU DANG NHAP - next chua san trong biến user khai bao tren jwt
      if (trigger === "signIn" && user && account?.provider === "credentials") {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.user = user.user;
      }

      return token;
    },
    //@ts-ignore
    // ĐÂY CHÍNH LÀ NAP DATA LAY DC TỪ TOKEN BÊN TRÊN VÔ SESSION - ĐẦY ĐỦ THÌ BACK MỚI CHO HOAT ĐỘNG
    // session này cũng dc lưu bên clinet- KHI TA KẸP ADDRESS THÌ BÊN TAB HEADER CLIENT CŨNG CÓ BEN CONSOLE
    async session({ session, token, user }) {
      //@ts-ignore
      // gắn token vào session
      //Token dc cookie gửi về session - giải mã và lưu vao Ram
      //session.address = token.address;
      // Gắn token (có data từ back lun) vô session
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        //@ts-ignore
        session.user = token.user;
      }
      return session;
    },
  },
};

// THỰC THI HÀM NEXT AUTH
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
