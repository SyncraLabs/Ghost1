import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost - Eliminar Marca de Agua IA y Credenciales",
  description: "Herramienta gratuita para eliminar marca de agua IA y credenciales de contenido de LinkedIn, C2PA y Adobe. Protege tu privacidad y limpia tus imágenes al instante.",
  keywords: ["eliminar marca de agua ai", "borrar credenciales linkedin", "quitar c2pa", "limpiar metadatos imagen", "privacidad imagen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
