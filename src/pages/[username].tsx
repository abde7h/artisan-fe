import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const userIsSame = false;
  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        const apiUrl = "http://localhost:8080/1.0.0/artisanProfile/" + username;

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: ArtisanProfile = await response.json();
          setArtisanProfile(data);
        } catch (error) {
          console.log("There was a problem with the fetch operation:");
        }
      }
    };

    fetchData();
  }, [username]);

  function seguirEditar() {
    if (userIsSame) {
      return (
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-lg">
          Editar perfil
        </button>
      );
    } else {
      return (
        <button className="mt-6 px-6 py-3 bg-amber-900 text-white rounded text-lg">
          Seguir
        </button>
      );
    }
  }
  return (
    <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-7xl w-full">
        {/* Cabecera */}
        <div className="flex items-start mb-6">
          {artisanProfile && (
            <>
              <img
                src={artisanProfile.image}
                alt={
                  artisanProfile
                    ? `Foto de perfil de ${artisanProfile.username}`
                    : "Foto de perfil"
                }
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 mr-6"
              />
            </>
          )}
          <div className="flex-grow flex flex-col">
            <div className="flex items-center mb-4">
              <div>
                {artisanProfile && (
                  <>
                    <h1 className="text-2xl font-bold mb-2">
                      {artisanProfile.username}
                    </h1>
                    <p className="text-xl">@{artisanProfile.username}</p>
                  </>
                )}
              </div>

              <div className="ml-4">{seguirEditar()}</div>
            </div>

            <div className="flex items-center space-x-10 mt-2 mb-4">
              <div>
                <span className="text-xl font-semibold">
                  {artisanProfile?.productsCount}
                </span>
                <span className="text-lg"> productos</span>
              </div>
              <div>
                <span className="text-xl font-semibold">
                  {artisanProfile?.followersCount}
                </span>
                <span className="text-lg"> seguidores</span>
              </div>
            </div>

            <div>
              <p className="text-lg">
                {artisanProfile && <>{artisanProfile.description}</>}
              </p>
            </div>
          </div>
        </div>

        {/* Feed de imágenes */}
        <div className="grid grid-cols-5 gap-6">
          {artisanProfile?.products.map((product) => (
            <a
              href={`${artisanProfile.username}/${product.product_id}`}
              key={product.product_id}
              rel="noopener noreferrer"
            >
              <img
                src={product.image}
                alt={product.description}
                className="object-cover w-full h-52 rounded-lg shadow-md"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
