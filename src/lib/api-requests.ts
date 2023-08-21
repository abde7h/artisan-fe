import { UserProfile, UserCreate, ArtisanProfile, CategoryInterface, ProductInterface, FormProductState } from "./types";
import { LoginUserInput } from "./validations/user.schema";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:8080/1.0.0";



export async function createUser(newUser: UserCreate): Promise<UserProfile> {
    try {
        console.log(JSON.stringify(newUser))
        const response = await fetch(`${SERVER_ENDPOINT}/user/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        console.log(response.status)

        if (!response.ok) {
            throw new Error(
                `Error creating user: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getUser(credentials: LoginUserInput): Promise<{ user?: UserProfile }> {
    try {
        const { email, password } = credentials;
        const response = await fetch(`${SERVER_ENDPOINT}/user/${email}/${password}`);

        const data = await response.json();
        return data as { user?: UserProfile };
    } catch (error) {
        throw error;
    }
}

export async function createArtisan(newUser: UserCreate): Promise<ArtisanProfile> {
    try {
        console.log(JSON.stringify(newUser))
        const response = await fetch(`${SERVER_ENDPOINT}/artisan/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        console.log(response.status)

        if (!response.ok) {
            throw new Error(
                `Error creating user: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getArtisan(credentials: LoginUserInput): Promise<{ user?: ArtisanProfile }> {
    try {
        const { email, password } = credentials;
        const response = await fetch(`${SERVER_ENDPOINT}/artisan/${email}/${password}`);

        const data = await response.json();
        return data as { user?: ArtisanProfile };
    } catch (error) {
        throw error;
    }
}

export async function getCategories(): Promise<CategoryInterface[]> {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/category`);

        const data = await response.json();
        return data as CategoryInterface[];
    } catch (error) {
        throw error;
    }
}

export async function createProduct(newProduct: FormProductState): Promise<ProductInterface> {
    try {
        console.log(JSON.stringify(newProduct))
        const response = await fetch(`${SERVER_ENDPOINT}/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        console.log(response.status)

        if (!response.ok) {
            throw new Error(
                `Error creating user: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getProduct(productId: string): Promise<{ product?: ProductInterface }> {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/product/${productId}`);

        const data = await response.json();
        return data as { product?: ProductInterface };
    } catch (error) {
        throw error;
    }
}

export const uploadImage = async (imagePath: string, productId: string) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/product/photo/upload/${productId}`, {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  };

// const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

// async function handleResponse<T>(response: Response): Promise<T> {
//     const contentType = response.headers.get("Content-Type") || "";
//     const isJson = contentType.includes("application/json");
//     const data = isJson ? await response.json() : await response.text();

//     if (!response.ok) {
//         if (isJson && data.errors !== null) {
//             throw new Error(JSON.stringify(data.errors));
//         }

//         throw new Error(data.message || response.statusText);
//     }

//     return data as T;
// }

// export async function apiRegisterUser(
//     credentials: string
// ): Promise<FilteredUser> {
//     const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: credentials,
//     });

//     return handleResponse<UserResponse>(response).then((data) => data.data.user);
// }

// export async function apiLoginUser(credentials: string): Promise<string> {
//     const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: credentials,
//     });

//     return handleResponse<UserLoginResponse>(response).then((data) => data.token);
// }

// export async function apiLogoutUser(): Promise<void> {
//     const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     return handleResponse<void>(response);
// }

// export async function apiGetAuthUser(token?: string): Promise<FilteredUser> {
//     const headers: Record<string, string> = {
//         "Content-Type": "application/json",
//     };

//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//     }
//     const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
//         method: "GET",
//         credentials: "include",
//         headers,
//     });

//     return handleResponse<UserResponse>(response).then((data) => data.data.user);
// }
