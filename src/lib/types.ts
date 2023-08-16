export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    telephone: string;
    description: string | null;
    image: string;
}

export interface UserRegister {
    username: string;
    email: string;
    password: string;
    name: string;
    telephone: string;
    description: string | null;
    image: string;
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
