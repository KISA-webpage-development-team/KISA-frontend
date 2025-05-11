import localFont from "next/font/local";
import { Heebo, Montserrat } from "next/font/google";

export const sejongHospitalLight = localFont({
  src: "../../assets/fonts/Sejonghospital-Light.ttf",
});

export const sejongHospitalBold = localFont({
  src: "../../assets/fonts/Sejonghospital-Bold.ttf",
});

export const arial = localFont({
  src: "../../assets/fonts/arial.ttf",
});

export const heebo = Heebo({ subsets: ["latin"] });

export const montserrat = Montserrat({ subsets: ["latin"] });
