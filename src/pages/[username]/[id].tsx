import Loader from "@/app/components/Loader";
import NotFound from "@/app/components/NotFound";
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

  //Constante falsa del userID
  const userID = 1;

  const [product, setProduct] = useState<Product | null>(null);
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null);
  const [showError, setShowError] = useState(false);
  const [liked, setLiked] = useState(false);

  const HeartEmpty = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  const HeartFull = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  const handleLikeToggle = async () => {
    // Dependiendo del estado actual, determina qué endpoint y método llamar
    const endpoint = liked
      ? `http://localhost:8080/1.0.0/likes/delete/${userID}/${product?.product_id}`
      : "http://localhost:8080/1.0.0/likes/add";
    const method = liked ? "DELETE" : "POST";
    const body = liked
      ? null
      : JSON.stringify({ user_id: userID, product_id: product?.product_id });

    try {
      // Llama al endpoint con fetch
      const response = await fetch(endpoint, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200 && response.status !== 201) {
        // Aquí agregamos la verificación para el código 201 también
        throw new Error("Error al realizar la acción de like/unlike");
      }

      // Si todo va bien, invierte el estado del "like"
      setLiked((prevState) => !prevState);
    } catch (error) {
      console.error(
        "Hubo un error al intentar cambiar el estado de like:",
        error
      );
      // Aquí puedes manejar errores, mostrar un mensaje al usuario, etc.
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/1.0.0/likes/${userID}/${productId}`
      );

      if (response.status === 404) {
        setLiked(false);
        return;
      }
      
      // Si el servidor devuelve un estado 200 OK, entonces el producto ha sido "likeado".
      if (response.ok) {
        const data = await response.json();

        // Puedes tener una condición adicional si la respuesta tiene un campo específico para indicarlo.
        if (data) {
          setLiked(true);
        }
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error al verificar el estado de 'like':", error);
    }
  };

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

          const specificProduct = data.products.find(
            (prod) => prod.product_id === Number(productId)
          );
          if (specificProduct) {
            setProduct(specificProduct);
            setShowError(false);
          }

          // Una vez que tenemos la información del producto, verificamos si ya ha sido "likeado"
          await checkIfLiked();
        } catch (error) {
          console.log("There was a problem with the fetch operation:", error);
          setTimeout(() => {
            setShowError(true);
          }, 500);
        }
      }
    };

    fetchData();
  }, [username, productId]);

  return (
    <>
      {product ? (
        <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-2xl max-w-7xl w-full">
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

                {/* Botón de Like */}
                <button
                  onClick={handleLikeToggle}
                  className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg focus:outline-none flex items-center"
                >
                  {liked ? <HeartFull /> : <HeartEmpty />}
                  <span className="ml-2">
                    {liked ? "No me gusta" : "Me gusta"}
                  </span>
                </button>
              </div>

              {/* Descripción del producto */}
              <p className="text-lg">{product.description}</p>
            </div>
          </div>
        </div>
      ) : showError ? (
        <NotFound />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductDetails;
