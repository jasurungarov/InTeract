import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL('https://in-teract.vercel.app'),
	title: 'InTeract — Real-Time Chat Platform by Jasur Ungarov',
	description:
		'InTeract is a next-generation real-time chat platform built with Next.js and MongoDB by Jasur Ungarov. Designed for speed, reliability, and seamless communication across the web.',
	authors: [{ name: 'Jasur Ungarov', url: 'https://ungarov.uz' }],
	icons: { icon: '/images/logo.png' },
	openGraph: {
		title: 'InTeract — Real-Time Chat Platform',
		description:
			'Experience instant and interactive conversations with InTeract, a modern real-time chat application built using Next.js and MongoDB by Jasur Ungarov.',
		type: 'website',
		url: 'https://in-teract.vercel.app',
		locale: 'en_US',
		images: ['/images/ITdark.png'],
		countryName: 'Kyrgyzstan',
		siteName: 'InTeract',
		emails: 'info@interact.com',
	},
	keywords:
		'InTeract, Interact app, InTeract chat, Jasur Ungarov, Next.js chat app, MongoDB chat app, real-time messaging, interactive chat platform, modern web communication, Ungarov web, Kyrgyzstan tech, next generation chat, instant messaging app',
};


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
