export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    surnames: string;
    telephone: string;
    description: string | null;
    image: string;
}

export interface ArtisanProfile {
    artisan_id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    surnames: string;
    telephone: string;
    description: string | null;
    image: string;
}

export interface UserCreate {
    username: string;
    email: string;
    password: string;
    name: string;
    surnames: string;
    telephone: string;
    description: string | null;
    image: string | null;
}

export interface UserLoggedInterface {
    user: {
      id: string;
      username: string;
      email: string;
      isArtisan: boolean;
      image: string;
    };
}

// export interface UserResponse {
//     status: string;
//     data: {
//         user: UserProfile;
//     };
// }

// export interface UserLoginResponse {
//     status: string;
//     token: string;
// }
