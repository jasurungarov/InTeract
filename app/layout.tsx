import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL('https://in-teract.vercel.app'),
	title: 'InTeract',
	description: 'InTeract is a real-time chat application built with Next.js and MongoDB, developed by Jasur Ungarov. Designed for smooth, fast, and interactive communication.',
	authors: [{ name: 'Jasur Unagrov', url: 'https://ungarov.uz' }],
	 icons: { icon: "/images/Logo1.png" },
	openGraph: {
		title: 'InTeract',
		description: "InTeract built with Next.js and MongoDB. Developed by Jasur Ungarov.",
		type: 'website',
		url: 'https://in-teract.vercel.app',
		locale: 'kg_KG',
		images: '/images/Logo1.png',
		countryName: 'Kyrgyzstan',
		siteName: 'InTeract',
		emails: 'info@interact.com',
	},
	keywords: "InTeract, InTeract web, InTeract web application, Ilon, Ilon Mask, Jasur Ungarov, Ungarov Jasur, Ungarov, Jasur, Ungarov web, Jasur web, interact, interact app, interact web app, interact web application, real-time chat, next.js chat app, mongodb chat app, next.js messaging app, mongodb messaging app, real-time messaging, interactive chat application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Provider>
      </body>
    </html>
  );
}
