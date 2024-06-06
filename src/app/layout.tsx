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
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            {/* Theme dùng cấu hình MUI hoat dong hiệu quả */}

            {children}
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
