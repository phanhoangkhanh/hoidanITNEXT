import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/components/auth/auth.signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// DÙNG SERVER ĐỂ CHECK SESSION
const SignInPage = async () => {
  // check session có dc truyền đi chưa
  const session = await getServerSession(authOptions);
  console.log("SESSIN:", session);
  if (session) {
    return redirect("/");
  }
  return <AuthSignIn />;
};

export default SignInPage;
