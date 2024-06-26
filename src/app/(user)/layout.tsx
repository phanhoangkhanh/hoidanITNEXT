import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { SessionProvider } from "next-auth/react";

// DÀNH CHON SEO - META DATA
// export const metadata = {
//   title: 'Next.js App Router + Material UI v5',
//   description: 'Next.js App Router + Material UI v5',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // thừa kế từ Layout ngoài app và chỉ thêm Footer + Header
    <html lang="en">
      <body>
        <AppHeader />
        {/* Theme dùng cấu hình MUI hoat dong hiệu quả */}

        {children}
        <AppFooter />
      </body>
    </html>
  );
}
