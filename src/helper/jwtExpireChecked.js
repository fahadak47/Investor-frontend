import jwtDecode from "jwt-decode";

export const isJwtExpired = (token) => {
  if (typeof token !== "string" || !token)
    throw new Error("Invalid token provided");

  let isJwtExpired = false;
  const { exp } = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  if (currentTime >= exp) isJwtExpired = true;

  return isJwtExpired;
};
