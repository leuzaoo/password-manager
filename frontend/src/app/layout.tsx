import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Gerenciador de senhas | Não perca mais as suas senhas",
  description:
    "Salve suas senhas em apenas um só lugar com nosso gerenciador de senhas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <h1 className="sr-only">Gerenciador de senhas</h1>
        {children}
      </body>
    </html>
  );
}
