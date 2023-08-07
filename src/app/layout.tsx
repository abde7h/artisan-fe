import Navbar from "./components/Navbar";
import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Artisan",
  description: "Productos de artesanía hecho por artesanos verificados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-ES">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
