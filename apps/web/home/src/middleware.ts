// middleware:
// before the request (to render the page) is sent to the server,
// middleware logic is executed

// to learn more: https://velog.io/@uno8941/NextJS-Middleware

// withAuth middleware from next-auth library
// automatically checks page routes listed on the matcher
// if the user is not authenticated, redirect to the signin page
// (autoOptions.ts - redirect function will be executed)
import { withAuth } from "next-auth/middleware";
export default withAuth;

export const config = {
  matcher: [
    "/users/:path*",
    "/posts/create/:path*",
    "/posts/update/:path*",
    "/posts/delete/:path*",
    "/pocha/:path*",
  ],
};
