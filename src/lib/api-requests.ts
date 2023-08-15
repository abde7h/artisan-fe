import { UserProfile, UserLoginResponse, UserResponse, UserRegister } from "./types";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:8080/1.0.0";

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

export async function apiRegisterUser(credentials: string): Promise<UserProfile> {
    try {
        const { username, email, password, name, telephone, description, image } = JSON.parse(credentials);
        const userRegister: UserRegister = { username, email, password, name, telephone, description, image };

        const response = await fetch(`${SERVER_ENDPOINT}/user/add`, {
            method: "POST",
            //credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userRegister),
        });

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

export async function apiLoginUser(email: string): Promise<{ user?: UserProfile }> {
    try {
        const response = await fetch(`${SERVER_ENDPOINT}/user/email/${email}`);

        const data = await response.json();
        return data as { user?: UserProfile };
    } catch (error) {
        throw error;
    }
}

export async function logoutUser(): Promise<void> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return handleResponse<void>(response);
}

export async function apiGetAuthUser(token?: string): Promise<UserProfile> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
        method: "GET",
        credentials: "include",
        headers,
    });

    return handleResponse<UserResponse>(response).then((data) => data.data.user);
}


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
