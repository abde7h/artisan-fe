import Loader from "@/app/components/Loader";
import NotFound from "@/app/components/NotFound";
import SeguirEditar from "@/app/components/SeguirEditar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { UserLoggedInterface } from "@/lib/types";

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
  artisan_id: number;
  name: string;
  surnames: string;
  username: string;
  description: string;
  image: string;
  followersCount: number;
  productsCount: number;
  products: Product[];
  followers?: any;
}

interface UserProfileData extends ArtisanProfile {
  listproduct?: Product[];
  listartisan?: any[];
}

function UserProfile() {
  const userLoggedCookie: any = getCookie("userLogged");
  let userLoggedString: string | null = null;
  if (userLoggedCookie) userLoggedString = userLoggedCookie.toString();

  let userLogged: UserLoggedInterface | null = null;
  if (userLoggedString) userLogged = JSON.parse(userLoggedString);

  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [perfilArtesano, setPerfilArtesano] = useState(true);

  const { username: rawUsername } = router.query;

  // Asegurarte de que username sea una cadena de texto.
  const username = typeof rawUsername === "string" ? rawUsername : "";

  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(
    null
  );
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  const fetchData = async () => {
    if (username) {
      // Intenta obtener el perfil del artesano
      let apiUrl = `http://localhost:8080/1.0.0/artisanProfile/${username}`;
      try {
        let response = await fetch(apiUrl);

        // Si no es un artesano, intenta obtener el perfil del usuario
        if (!response.ok) {
          apiUrl = `http://localhost:8080/1.0.0/userDTO/${username}`;
          response = await fetch(apiUrl);

          setPerfilArtesano(false);
          // Si tampoco es un usuario, lanza un error
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        }

        const data: UserProfileData = await response.json();
        setProfileData(data);
        setShowError(false);
      } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
        setTimeout(() => {
          setShowError(true);
        }, 500);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <>
      {profileData ? (
        perfilArtesano ? (
          <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-2xl max-w-7xl w-full">
              {/* Cabecera */}
              <div className="flex items-start mb-6">
                <img
                  src={profileData.image}
                  alt={`Foto de perfil de ${profileData.username}`}
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 mr-6"
                />
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">
                        {profileData.name} {profileData.surnames}
                      </h1>
                      <p className="text-xl">@{profileData.username}</p>
                    </div>
                    <div className="ml-4">
                      <SeguirEditar
                        userName={
                          userLogged?.user.isArtisan
                            ? profileData.username
                            : username
                        }
                        artisanName={
                          userLogged?.user.isArtisan
                            ? profileData.name
                            : username
                        }
                        userID={
                          userLogged?.user.isArtisan
                            ? profileData.artisan_id
                            : 2
                        }
                        artisanID={profileData.artisan_id}
                        updateFollowers={fetchData}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-10 mt-2 mb-4">
                    <div>
                      <span className="text-xl font-semibold">
                        {profileData.productsCount}
                      </span>
                      <span className="text-lg"> productos</span>
                    </div>
                    <div>
                      <span className="text-xl font-semibold">
                        {profileData.followersCount}
                      </span>
                      <span className="text-lg"> seguidores</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg">{profileData.description}</p>
                  </div>
                </div>
              </div>
              {/* Feed de imágenes */}
              <div className="grid grid-cols-5 gap-6">
                {profileData.products &&
                  Array.isArray(profileData.products) &&
                  profileData.products.map((product) => (
                    <a
                      href={`${profileData.username}/${product.product_id}`}
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
        ) : (
          <div className="flex items-center justify-center mt-12 min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-2xl max-w-7xl w-full">
              {/* Cabecera */}
              <div className="flex items-start mb-6">
                <img
                  src={profileData.image}
                  alt={`Foto de perfil de ${profileData.username}`}
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 mr-6"
                />
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">
                        {profileData.name} {profileData.surnames}
                      </h1>
                      <p className="text-xl">@{profileData.username}</p>
                    </div>
                    <div className="ml-4">
                      <SeguirEditar
                        userName={
                          userLogged?.user.isArtisan
                            ? profileData.username
                            : username
                        }
                        artisanName={
                          userLogged?.user.isArtisan
                            ? profileData.name
                            : username
                        }
                        userID={
                          userLogged?.user.isArtisan
                            ? profileData.artisan_id
                            : 1
                        }
                        artisanID={profileData.artisan_id}
                        updateFollowers={fetchData}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg">{profileData.description}</p>
                  </div>
                </div>
              </div>
              {/* Feed de imágenes */}
              <div className="grid grid-cols-5 gap-6">
                {profileData.listproduct &&
                  Array.isArray(profileData.listproduct) &&
                  profileData.listproduct.map((product, index) => {
                    const artisanUsername =
                      profileData.listartisan &&
                      profileData.listartisan[index]?.username;
                    const artisanImage =
                      profileData.listartisan &&
                      profileData.listartisan[index]?.image;
                    return (
                      <div className="relative" key={product.product_id}>
                        {/* Icono del artesano */}
                        <Link href={`/${artisanUsername}`}>
                          <div className="absolute top-4 left-4 flex flex-col items-center cursor-pointer object-cover">
                            <img
                              src={artisanImage}
                              alt={artisanUsername}
                              className="w-10 h-10 rounded-full shadow-lg mb-2"
                            />
                            <span className="text-black text-sm">
                              {artisanUsername}
                            </span>
                          </div>
                        </Link>

                        {/* Imagen del producto */}
                        <a
                          href={`${artisanUsername}/${product.product_id}`}
                          rel="noopener noreferrer"
                        >
                          <img
                            src={product.image}
                            alt={product.description}
                            className="object-cover w-full h-52 rounded-lg shadow-md"
                          />
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )
      ) : showError ? (
        <NotFound />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserProfile;
