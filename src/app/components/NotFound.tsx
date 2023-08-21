import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          404 - Página no encontrada
        </h1>
        <p className="text-lg text-gray-700">
          Lo sentimos, la página que estás buscando no existe.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
