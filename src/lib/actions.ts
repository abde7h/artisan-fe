import { createArtisan, createUser, getUser, getArtisan } from "./api-requests";
import {
  UserCreate,
  UserProfile,
  UserLoggedInterface,
  ArtisanProfile,
  FormProductState,
} from "./types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { LoginUserInput, RegisterUserInput } from "./validations/user.schema";
import {
  getCookie,
  setCookie,
  deleteCookie,
  CookieValueTypes,
} from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

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
  const user: { user?: UserProfile } = await getUser(credentials);
  const { user_id, username, email, image } = user as UserProfile;

  const userLogged: UserLoggedInterface = {
    user: {
      id: user_id,
      username,
      email,
      isArtisan: false,
      image,
    },
  };

  // const userLogged: UserLoggedInterface = {
  //   user: {
  //     id: "1",
  //     username: "diego",
  //     email: "email",
  //     isArtisan: false,
  //     image: "imagendiego",
  //   },
  // };

  setCookie("userLogged", JSON.stringify(userLogged));

  return user;
}

export async function registerArtisan(
  credentials: RegisterUserInput
): Promise<ArtisanProfile> {
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

  return await createArtisan(newUser);
}

export async function loginArtisan(
  credentials: LoginUserInput
): Promise<{ user?: ArtisanProfile }> {
  const user: { user?: ArtisanProfile } = await getArtisan(credentials);
  const { artisan_id, username, email, image } = user as ArtisanProfile;

  const userLogged: UserLoggedInterface = {
    user: {
      id: artisan_id,
      username,
      email,
      isArtisan: true,
      image,
    },
  };

  // const userLogged: UserLoggedInterface = {
  //   user: {
  //     id: "1",
  //     username: "diego",
  //     email: "email",
  //     isArtisan: true,
  //     image: "imagendiego",
  //   },
  // };

  setCookie("userLogged", JSON.stringify(userLogged));

  return user;
}

export const getUserLogged = (): string => {
  const userLoggedCookie = getCookie("userLogged");
  let userLoggedString: string = "";
  if (userLoggedCookie) userLoggedString = userLoggedCookie?.toString();

  return userLoggedString;
};

export const createNewProduct = async (
  form: FormProductState,
  artisanId: string
) => {
  // const imageUrl = await uploadImage(form.image);

  // if (imageUrl.url) {
  //   client.setHeader("Authorization", `Bearer ${token}`);

  // const variables = {
  //   input: {
  //     ...form,
  //     image: imageUrl.url,
  //     createdBy: {
  //       link: creatorId
  //     }
  //   }
  // };

  //   return makeGraphQLRequest(createProjectMutation, variables);
  // }
  console.log(form);
};

// export const updateProduct = async (form: FormProductState, projectId: string) => {
//   function isBase64DataURL(value: string) {
//     const base64Regex = /^data:image\/[a-z]+;base64,/;
//     return base64Regex.test(value);
//   }

//   let updatedForm = { ...form };

//   const isUploadingNewImage = isBase64DataURL(form.image);

//   if (isUploadingNewImage) {
//     const imageUrl = await uploadImage(form.image);

//     if (imageUrl.url) {
//       updatedForm = { ...updatedForm, image: imageUrl.url };
//     }
//   }

//   client.setHeader("Authorization", `Bearer ${token}`);

//   const variables = {
//     id: projectId,
//     input: updatedForm,
//   };

//   return makeGraphQLRequest(updateProjectMutation, variables);
// };

// export const deleteProject = (id: string, token: string) => {
//   client.setHeader("Authorization", `Bearer ${token}`);
//   return makeGraphQLRequest(deleteProjectMutation, { id });
// };

// export const uploadImage = async (imagePath: string) => {
//   try {
//     const response = await fetch(`${serverUrl}/api/upload`, {
//       method: "POST",
//       body: JSON.stringify({
//         path: imagePath,
//       }),
//     });
//     return response.json();
//   } catch (err) {
//     throw err;
//   }
// };
