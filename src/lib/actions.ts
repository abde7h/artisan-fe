import {
  createArtisan,
  createUser,
  getUser,
  getArtisan,
  createProduct,
  uploadImage,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./api-requests";
import {
  UserCreate,
  UserProfile,
  UserLoggedInterface,
  ArtisanProfile,
  FormProductState,
  ProductInterface,
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
  //     isArtisan: true,
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

export const getUserLogged = (): UserLoggedInterface | null => {
  const userLoggedCookie: any = getCookie("userLogged");
  let userLoggedString: string | null = null;
  if (userLoggedCookie) userLoggedString = userLoggedCookie.toString();

  let userLogged: UserLoggedInterface | null = null;
  if (userLoggedString) userLogged = JSON.parse(userLoggedString);

  return userLogged;
};

export const createNewProduct = async (form: FormProductState, imagenData: File | null): Promise<ProductInterface> => {
  const {
    artisan_id,
    name,
    description,
    price,
    category_id,
    creation_date,
    sold,
    user_id,
    buy_date,
    visible,
  } = form as FormProductState;

  const productoSinImagen: FormProductState = {
    artisan_id,
    name,
    image: "",
    description,
    price,
    category_id,
    creation_date,
    sold,
    user_id,
    buy_date,
    visible
  };

  const producto = await createProduct(productoSinImagen);
  await uploadImage(imagenData, producto.product_id);

  return producto;
};

export const editProduct = async (
  form: FormProductState,
  productId: string
): Promise<ProductInterface> => {
  //const product = await getProduct(productId);
  const updatedProduct = await updateProduct(form, productId);

  //await uploadImage(updatedProduct);

  return updatedProduct;
};

export async function removeProduct(productId: string) {
  await deleteProduct(productId);
}

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
