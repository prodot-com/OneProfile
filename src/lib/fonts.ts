import { Inter, Poppins, Roboto, Roboto_Mono } from "next/font/google";
import { FontFamily } from "@prisma/client";

export const inter = Inter({ subsets: ["latin"], display: "swap" });
export const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
export const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], display: "swap" });
export const mono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export function getFontClass(font: FontFamily): string {
  switch (font) {
    case "INTER":
      return inter.className;
    case "POPPINS":
      return poppins.className;
    case "ROBOTO":
      return roboto.className;
    case "MONO":
      return mono.className;
    default:
      return inter.className;
  }
}
