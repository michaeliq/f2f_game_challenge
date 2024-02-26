import { Inter } from "next/font/google";
import "./globals.css";
import ContainerGame from "@/components/ContainerGame";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "F2F Challenge",
  description: "De Alcon Laboratorios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContainerGame>
          {children}
        </ContainerGame>
      </body>
    </html>
  );
}
