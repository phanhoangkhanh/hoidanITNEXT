//thiet kế 1 wrapper use clinet để boc sessionProvider

"use client";
import { SessionProvider } from "next-auth/react";

// DÀNH CHON SEO - META DATA
// export const metadata = {
//   title: 'Next.js App Router + Material UI v5',
//   description: 'Next.js App Router + Material UI v5',
// };

export default function NextAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
