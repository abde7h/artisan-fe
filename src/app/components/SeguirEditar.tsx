import { UserLoggedInterface } from "@/lib/types";
import { getCookie } from "cookies-next";
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
  const isArtisan = true;
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
  const userLoggedCookie: any = getCookie("userLogged");
  let userLoggedString: string | null = null;
  if (userLoggedCookie) userLoggedString = userLoggedCookie.toString();

  let userLogged: UserLoggedInterface | null = null;
  if (userLoggedString) userLogged = JSON.parse(userLoggedString);

  console.log(userLogged?.user.isArtisan);

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

  if (userLogged?.user.isArtisan) {
    // Comprueba si el usuario logueado es el mismo que el usuario del perfil
    if (userLogged?.user.username === userName) {
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
                {/* ... [El resto de tu código JSX para editar el perfil aquí] */}
              </div>
            </div>
          )}
        </>
      );
    } else {
      // Si no son el mismo usuario, no mostrar nada
      return null;
    }
  } else {
    // Si el usuario logueado no es un artesano
    if (userLogged?.user.username !== userName) {
      return (
        <button
          onClick={handleButtonClick}
          className="mt-6 px-6 py-3 bg-amber-900 text-white rounded text-lg"
        >
          {isFollowing ? "Dejar de seguir" : "Seguir"}
        </button>
      );
    } else {
      // Si son el mismo usuario, no mostrar nada
      return null;
    }
  }
};

export default SeguirEditar;
