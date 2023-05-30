//this middleware function runs everytime route changes

import { NextResponse } from "next/server";
// import { useRouter } from "next/router";

export default function middleware(req) {
  // const router = useRouter();
  // const router = useRouter();
  let verify = req.cookies.get("loggedIn");

  const clientURL =
    req.headers.origin ||
    req.headers.referer ||
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    "";

  const url = req.url;

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect(`${clientURL}/login`);
  }
  // if (!verify && url.includes("/admin")) {
  //   return NextResponse.redirect(`${clientURL}/signin`);
  // }
  // if (!verify && url === `${clientURL}/my-posts`) {
  //   return NextResponse.redirect(`${clientURL}/signin`);
  // }
  // if (!verify && url === `${clientURL}/create-post`) {
  //   return NextResponse.redirect(`${clientURL}/signin`);
  // }
  // if (!verify && url === `${clientURL}/admin/dashboard`) {
  //   return NextResponse.rewrite(`${clientURL}/signin`);
  // }
}
