import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Product {
  product_id: number;
  artisan_id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  category_id: number;
  creation_date: string;
  sold: boolean;
  user_id?: number;
  buy_date?: string;
  visible?: boolean;
}

interface ArtisanProfile {
  username: string;
  description: string;
  image: string;
  followersCount: number;
  productsCount: number;
  products: Product[];
  followers?: any;
}

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const username = pathSegments[1];
  const productId = pathSegments[2];

  const [product, setProduct] = useState<Product | null>(null);
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (username && productId) {
        const apiUrl = `http://localhost:8080/1.0.0/artisanProfile/${username}`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: ArtisanProfile = await response.json();

          setArtisan(data);

          // Buscar el producto específico usando el productId desde la lista de productos del artesano
          const specificProduct = data.products.find(
            (prod) => prod.product_id === Number(productId)
          );
          console.log("Specific Product:", specificProduct);
          if (specificProduct) {
            setProduct(specificProduct);
          }
        } catch (error) {
          console.log("There was a problem with the fetch operation:", error);
        }
      }
    };

    fetchData();
  }, [username, productId]);

  return (
    <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-7xl w-full">
        {product ? (
          <div>
            {/* Nombre del producto */}
            <h1 className="text-4xl font-bold mb-6">{product.name}</h1>

            {/* Imagen del producto con precio encima y detalles del artesano */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover mb-6 rounded-lg shadow-md"
              />
              {/* Detalles del artesano */}
              {artisan && (
                <Link href={`http://localhost:3000/${artisan.username}`}>
                  <div className="absolute top-4 left-4 flex flex-col items-center">
                    <img
                      src={artisan.image}
                      alt={artisan.username}
                      className="w-14 h-14 rounded-full shadow-lg mb-2"
                    />
                    <span className="text-white">{artisan.username}</span>
                  </div>
                </Link>
              )}

              {/* Precio */}
              <span className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                {product.price} €
              </span>
            </div>

            {/* Descripción del producto */}
            <p className="text-lg">{product.description}</p>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
