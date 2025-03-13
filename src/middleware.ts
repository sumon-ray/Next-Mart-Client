// import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";
import { JwtPayload } from "jwt-decode";

interface UserInfo extends JwtPayload {
  role: string;
}

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = (await getCurrentUser()) as UserInfo;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};



// import { NextRequest, NextResponse } from "next/server";
// import { getCurrentUser } from "./services/AuthService";
// type Role = keyof typeof roleBasedPrivateRoutes;

// // roleBasedPrivateRoutes
// const roleBasedPrivateRoutes = {
//     user: [/^\/user/],
//     admin: [/^\/admin/]
// }
// // auth Routes
// const authRoutes = ["/login", "register"];
// export const middleware = async (request: NextRequest) => {
//     // path name
//   const { pathname } = request.nextUrl;
//   // user info
//   const userInfo = await getCurrentUser();
//   // checking
//   if (!userInfo) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(
//           `http://localhost:3000/login?redirectPath=${pathname}`,
//           request.url
//         )
//       );
//     }
//   }

// if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
//     const routes = roleBasedPrivateRoutes[userInfo?.role as Role]
//     if (routes.some((route)=>pathname.match(route))) {
//         return NextResponse.next()
//     }
// }
// return NextResponse.redirect(new URL("/", request.url))
// };

// // private routes
// export const config = {
//   matcher: ["/login", "/create-shop", "/admin", "/admin/:page", "/user", "/user/:page"],
// };
