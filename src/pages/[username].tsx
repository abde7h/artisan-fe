import Loader from "@/app/components/Loader";
import NotFound from "@/app/components/NotFound";
import SeguirEditar from "@/app/components/SeguirEditar";
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
  const router = useRouter();
  const { username } = router.query;
  const [showError, setShowError] = useState(false);

  const userIsFollowing = false;
  const userName = "artesano1";
  const isArtisan = false;

  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(
    null
  );
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  const fetchData = async () => {
    if (username) {
      const apiUrl = isArtisan
        ? `http://localhost:8080/1.0.0/artisanProfile/${username}`
        : `http://localhost:8080/1.0.0/userDTO/${username}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: UserProfileData = await response.json();
        console.log(data);
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
        isArtisan ? (
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
                        userName={isArtisan ? profileData.username : userName}
                        artisanName={isArtisan ? profileData.name : userName}
                        userID={isArtisan ? profileData.artisan_id : 2}
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
                        userName={isArtisan ? profileData.username : userName}
                        artisanName={isArtisan ? profileData.name : userName}
                        userID={isArtisan ? profileData.artisan_id : 1}
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
                    return (
                      <a
                        href={`${artisanUsername}/${product.product_id}`}
                        key={product.product_id}
                        rel="noopener noreferrer"
                      >
                        <img
                          src={product.image}
                          alt={product.description}
                          className="object-cover w-full h-52 rounded-lg shadow-md"
                        />
                      </a>
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
