// "use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "./config";

// export function getAuthCookieData() {
//   return new Promise((resolve, reject) => {
//     const cookieData = cookies().get(AUTH_COOKIE_NAME)?.value;
//     console.log(cookieData);

//     if (cookieData) {
//       resolve(cookieData);
//     } else {
//       reject(new Error("No auth cookie found"));
//     }
//   });
// }

export const getAuthCookieData = async () => {
  const cookieData = cookies().get(AUTH_COOKIE_NAME)?.value;
  return cookieData;
};
