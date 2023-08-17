import { UserProfile, SessionInterface } from "@/common.types";
import { createUser, getUser } from "./api-requests";
import { UserCreate, UserLoggedInterface } from "./types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { LoginUserInput, RegisterUserInput } from "./validations/user.schema";
import { getCookie, setCookie, deleteCookie, CookieValueTypes } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";

//const nextCookies = cookies();

export async function registerUser(
  credentials: RegisterUserInput
): Promise<UserProfile> {
  const { username, email, password, name, surnames, telephone } = credentials;

  const newUser: UserCreate = {
    username,
    email,
    password,
    name,
    surnames,
    telephone,
    description: null,
    image: "imagen usuario",
  };

  return await createUser(newUser);
}

export async function loginUser(
  credentials: LoginUserInput
): Promise<{ user?: UserProfile }> {
  const user: { user?: UserProfile } = await getUser(credentials.email);
  const hola: UserProfile = user as UserProfile;
  const { user_id, username, email, image } = hola;

  const userLogged: UserLoggedInterface = {
    user: {
      id: user_id,
      username,
      email,
      isArtisan: true,
      image,
    },
  };

  setCookie("userLogged", JSON.stringify(userLogged));

  return user;
}

export function getCurrentUser(): string | undefined {
  const userLogged = getCookie("userLogged");
  console.log("fgdhgdfghdi " + userLogged?.toString());

  // if (userLogged) {
  //   return JSON.parse(userLogged?.toString)
  // }

  return userLogged?.toString();
}
