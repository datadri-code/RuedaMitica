import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mítica | Oráculo de criaturas",
  description: "Gira la rueda y descubre qué criatura te encuentra hoy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
