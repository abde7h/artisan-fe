import React, { useState, useEffect } from "react";

interface SeguirEditarProps {
  userName: string;
  artisanName: string;
  userID: number;
  artisanID: number;
  updateFollowers: () => void;
}

const SeguirEditar: React.FC<SeguirEditarProps> = ({
  userName,
  artisanName,
  userID,
  artisanID,
  updateFollowers,
}) => {
  const isArtisan = false;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    id: isArtisan ? artisanID : userID,
    username: "",
    email: "", // Añadido el campo email
    password: "", // Añadido el campo password (aunque es posible que no quieras manejarlo así)
    name: "",
    surnames: "", // Cambiado de surname a surnames para coincidir con el backend
    telephone: "", // Cambiado de phone a telephone para coincidir con el backend
    description: "",
    image: "",
  });
  console.log(profileData);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleUpdate = async () => {
    const apiUrl = isArtisan
      ? `http://localhost:8080/1.0.0/artisan/update`
      : `http://localhost:8080/1.0.0/user/update`;

    const { id, ...restOfProfileData } = profileData;
    const dataToSend = {
      ...restOfProfileData,
      [isArtisan ? "artisan_id" : "user_id"]: id,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Datos actualizados exitosamente");
        fetchData();
        togglePopup(); // Cierra el popup después de actualizar
        updateFollowers();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  const fetchData = () => {
    const apiUrl = isArtisan
      ? `http://localhost:8080/1.0.0/artisan/${artisanID}`
      : `http://localhost:8080/1.0.0/user/${userID}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          id: isArtisan ? data.artisan_id : data.user_id,
          name: data.name,
          surnames: data.surnames,
          username: data.username,
          telephone: data.telephone,
          description: data.description,
          image: data.image,
          email: data.email,
          password: data.password,
        });
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  useEffect(() => {
    if (isPopupOpen) {
      fetchData();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    console.log("profileData ha cambiado:", profileData);
  }, [profileData]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      const apiUrl = `http://localhost:8080/1.0.0/followers/${artisanID}/${userID}`;
      try {
        const response = await fetch(apiUrl);
        console.log(response);
        if (response.status === 404) {
          setIsFollowing(false);
          console.log("Los usuarios no se siguen");
          return;
        }

        const data = await response.json();

        if (data) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error("Error al verificar el estado de seguimiento:", error);
      }
    };

    checkFollowingStatus();
  }, [artisanID, userID]);

  const handleButtonClick = async () => {
    if (isFollowing) {
      handleUnfollowClick();
    } else {
      handlefollowClick();
    }
  };

  const handleUnfollowClick = async () => {
    const apiUrl = `http://localhost:8080/1.0.0/followers/delete/${artisanID}/${userID}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsFollowing(false);
        updateFollowers();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error al dejar de seguir:", error);
    }
  };

  const handlefollowClick = async () => {
    const apiUrl = `http://localhost:8080/1.0.0/followers/add`;

    const dataToSend = {
      follower_id: artisanID,
      following_id: userID,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setIsFollowing(true);
        updateFollowers();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error al seguir:", error);
    }
  };

  if (true) {
    return (
      <>
        <button
          onClick={togglePopup}
          className="mt-6 px-6 py-3 bg-amber-900 text-white rounded text-lg"
        >
          Editar perfil
        </button>
        {isPopupOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) togglePopup(); // Cerrar si se hace clic fuera del contenido
            }}
          >
            <div className="bg-white p-6 rounded-lg w-1/3 relative">
              <button
                onClick={togglePopup}
                className="absolute top-2 right-2 text-amber-900 text-2xl"
              >
                ×
              </button>
              <div className="flex justify-center items-center mb-4">
                <img
                  src={profileData.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 mr-6 cursor-pointer"
                />
                <input type="file" className="hidden" />
              </div>

              {/* Contenedor de las dos columnas */}
              <div className="flex space-x-4">
                {/* Primera columna */}
                <div className="w-1/2">
                  <div>
                    <label className="block mb-2">Nombre</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-4"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-4"
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Segunda columna */}
                <div className="w-1/2">
                  <div>
                    <label className="block mb-2">Apellidos</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-4"
                      value={profileData.surnames}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          surname: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Teléfono</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-4"
                      value={profileData.telephone}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2">Descripción</label>
                <textarea
                  className="w-full p-2 border rounded mb-4"
                  value={profileData.description}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-amber-900 text-white px-4 py-2 rounded"
                  onClick={handleUpdate}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <button
        onClick={handleButtonClick}
        className="mt-6 px-6 py-3 bg-amber-900 text-white rounded text-lg"
      >
        {isFollowing ? "Dejar de seguir" : "Seguir"}
      </button>
    );
  }
};

export default SeguirEditar;
