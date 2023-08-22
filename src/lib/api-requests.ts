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

export async function updateProduct(updatedProduct: FormProductState, productId: string): Promise<ProductInterface> {
    try {
        console.log(JSON.stringify(updatedProduct))
        const response = await fetch(`${SERVER_ENDPOINT}/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
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

export const uploadImage = async (imagenData: File | null) => {
    try {
        const formData = new FormData();
        //if (imagenData)
            formData.append("file", imagenData?.toString());

        const response = await fetch(`${SERVER_ENDPOINT}/product/photo/upload/${product.product_id}`, {
            method: "POST",
            body: formData
        });
        console.log(response)
        return response.json();
    } catch (err) {
        throw err;
    }
};

export const deleteProduct = async (productId: string) => {

}