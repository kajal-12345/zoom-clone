import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Zoom",
  description: "Zoom clone",
  icons:["/icons/logo.svg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={
        {
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            socialButtonsVariant:'iconButton'
          },
          variables: {
            colorPrimary: 'rgb(37 99 235)',
            colorBackground: '#1C1F2E',
            colorText: '#fff',
            colorInputBackground: '#252a41',
            colorInputText: '#fff'
          }
        }
      }>
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
