import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

export const metadata = {
  title: "expert notes",
  description: "Crie e armazene suas notas de maneira simples e inteligente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
