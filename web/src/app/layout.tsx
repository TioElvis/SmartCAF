import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartCAF",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="it">
      <body className={roboto.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
