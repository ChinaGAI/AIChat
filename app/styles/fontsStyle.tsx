"use client";
import { Barlow, Fira_Code } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function FontsStyle() {
  return (
    <style jsx global>{`
      :root {
        --font-barlow: ${barlow.style.fontFamily};
        --font-firaCode: ${firaCode.style.fontFamily};
      }
    `}</style>
  );
}
