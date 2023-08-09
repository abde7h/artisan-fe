"use client";

import React, { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface ArtisanDTO {
  username: string;
  name: string;
  surnames: string;
  image: string;
}

interface BuscadorPerfilesProps {
  artisan: string;
  setArtisan: (artisan: string) => void;
}

const SearchManufacturer = ({ artisan, setArtisan }: BuscadorPerfilesProps) => {
  const [query, setQuery] = useState("");
  const [artisans, setArtisans] = useState<ArtisanDTO[]>([]);
  const isInputEmpty = query.trim() === "";

  useEffect(() => {
    const apiUrl = "http://localhost:8080/1.0.0/artisanDTO";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setArtisans(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const filteredArtisans = artisans.filter((item) => {
    const searchTerm = query.toLowerCase().replace(/\s+/g, "");
    const usernameMatch = item.username
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm);
    const nameMatch = item.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm);
    const surnamesMatch = item.surnames
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm);

    return usernameMatch || nameMatch || surnamesMatch;
  });

  return (
    <div>
      <Combobox value={artisan} onChange={setArtisan}>
        <div className={isInputEmpty ? "relative w-full" : "w-full"}>
          <Combobox.Input
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca un artesano..."
            className="rounded-full bg-gray-200 h-12 w-full"
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute mt-1 max-h-80 w-[27.5rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
              static
            >
              {filteredArtisans.map((artisan) => (
                <Combobox.Option
                  key={artisan.username}
                  className={({ active }) =>
                    `${active ? "bg-gray-100 text-gray-800 " : "text-gray-900"}`
                  }
                  value={artisan.username}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        {artisan.image && (
                          <img
                            src={artisan.image}
                            alt={artisan.username}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {artisan.name} {artisan.surnames}
                          </span>
                          <span className="text-sm text-gray-500">
                            @{artisan.username}
                          </span>
                        </div>
                      </div>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-pribg-primary-purple"
                          }`}
                        ></span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
