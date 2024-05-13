import type { Metadata, Viewport } from "next";
import FontsStyle from "./styles/fontsStyle";
import "./globals.scss";
import { cookies } from "next/headers";
import { THEME_KEY } from "@/config";
import Topbar from "./components/base/topbar";
import { AppContextProvider } from "@/context/app-context";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "智能聊天机器人",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieState = cookies();
  const theme = cookieState.get(THEME_KEY)?.value ?? "light";

  return (
    <html lang="zh">
      <head>
        <FontsStyle />
        <meta name="application-name" content="AI Chat" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Chat" />
        <meta property="og:locale" content="zh" />
        <meta
          property="og:description"
          content="智能聊天机器人 使用 AI 提升你的工作和学习效率"
        />
        <meta property="og:site_name" content="AI Chat" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body theme-mode={theme}>
        <Topbar />
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
