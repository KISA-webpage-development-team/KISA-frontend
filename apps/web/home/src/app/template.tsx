import { ReactNode } from "react";

import Header from "@/components/Header/Header";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import { getIsAdmin } from "@/apis/auth/queries";
import { UnderConstruction } from "@/final_refactor_src/components/feedback";

export default async function Template({ children }: { children: ReactNode }) {
  // flag to show under construction page
  const underConstruction = false;

  // pass over this session to Header to remove unnecessary re-renders
  const session = await getServerSession(authOptions);

  const isAdmin = await getIsAdmin(session?.user?.email, session?.token);

  // mainContentsWidth: this will control all of the horizontal padding and margin of the page contents
  const mainContentsWidth = "max-w-screen-2xl px-4 md:px-24 lg:px-32";

  return (
    <div className="h-full flex flex-col">
      <header
        className={`${sejongHospitalLight.className} top-0 z-40 
        bg-gradient-to-r from-michigan-blue/90 via-michigan-blue to-michigan-blue/85
      text-white`}
      >
        <Header session={session} />
      </header>

      <main
        className={`relative w-full h-full
        mx-auto ${mainContentsWidth}
        pt-3 md:pt-6`}
      >
        {underConstruction ? (
          isAdmin ? (
            children
          ) : (
            <UnderConstruction />
          )
        ) : (
          children
        )}
        {/* {children} */}
      </main>
    </div>
  );
}
