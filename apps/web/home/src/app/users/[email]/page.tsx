// "/users/[email]"

// [UI]
// UserProfile: User's profile information including image, name, major, etc
// UserBoard: User's posts and comments with toggle bar to switch between them

// [Rendering method] SSR (container) + CSR (components)
// [Auth Middleware applied]
import React from "react";
import { KISA_EMAIL } from "@/constants/email";
import { getSession } from "@/lib/next-auth/getSession";

// UI
import UserProfile from "@/features/users/components/view/UserProfile";
import UserBoard from "@/features/users/components/view/UserBoard";

import {
  NotLogin,
  NotAuthorized,
} from "@/final_refactor_src/components/feedback";

type UserViewPageProps = {
  params: {
    email: string;
  };
};

export default async function UserViewPage({ params }: UserViewPageProps) {
  // [NOTE] getSession() is a function based on next-auth
  // no need to handle missing session because of the auth middleware
  const session = await getSession();

  // [NOTE] email on the URL is encoded
  // need to decodeURIComponent to get the correct value
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  if (!session) {
    return <NotLogin />;
  }

  // [Business Logic]: Only KISA email is allowed to access KISA's user page
  if (
    decodedEmail.includes(KISA_EMAIL) &&
    !session?.user?.email.includes(KISA_EMAIL)
  ) {
    return <NotAuthorized />;
  }

  return (
    <section>
      <UserProfile email={decodedEmail} session={session} />
      <UserBoard email={decodedEmail} session={session} />
    </section>
  );
}
