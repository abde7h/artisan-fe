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

export interface CategoryInterface {
    category_id: string;
    name: string;
}

export interface ProductInterface {
    product_id: string;
    artisan_id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    category_id: string;
    creation_date: string;
    sold: boolean;
    user_id: string | null;
    buy_date: string | null;
    // visible: boolean | null;
}

export type FormProductState = {
    //product_id: string;
    artisan_id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    category_id: string;
    creation_date: string;
    sold: boolean;
    user_id: string | null;
    buy_date: string | null;
    // visible: boolean | null;
};

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
