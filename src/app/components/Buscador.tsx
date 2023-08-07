"use client";

import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface Artisan {
  user_id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  surnames: string;
  telephone: string;
  description: string;
  image: string;
}

interface BuscadorPerfilesProps {
  artisan: string;
  setArtisan: (artisan: string) => void;
}

const artisanLists = [
  {
    user_id: 1,
    username: "carlos",
    email: "user1@example.com",
    password: "pass1",
    name: "Carlos",
    surnames: "Lozano",
    telephone: "123456789",
    description: "Description 1",
    image: "https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg",
  },
  {
    user_id: 2,
    username: "cristian",
    email: "user2@example.com",
    password: "pass2",
    name: "Cristian",
    surnames: "Militar",
    telephone: "987654321",
    description: "Description 2",
    image: "https://www.realmadrid.com/img/vertical_380px/cristiano_550x650_20180917025046.jpg",
  },
  {
    user_id: 3,
    username: "diego",
    email: "user2@example.com",
    password: "pass2",
    name: "Diego",
    surnames: "Algo",
    telephone: "987654321",
    description: "Description 2",
    image: "https://www.realmadrid.com/img/vertical_380px/cristiano_550x650_20180917025046.jpg",
  },
  {
    user_id: 4,
    username: "Abde",
    email: "user2@example.com",
    password: "pass2",
    name: "Abde",
    surnames: "Nose",
    telephone: "987654321",
    description: "Description 2",
    image: "https://www.realmadrid.com/img/vertical_380px/cristiano_550x650_20180917025046.jpg",
  },
];

const SearchManufacturer = ({ artisan, setArtisan }: BuscadorPerfilesProps) => {
  const [query, setQuery] = useState("");
  const isInputEmpty = query.trim() === "";

  const filteredArtisans = artisanLists.filter((item) => {
    const searchTerm = query.toLowerCase().replace(/\s+/g, "");
    const usernameMatch = item.username.toLowerCase().replace(/\s+/g, "").includes(searchTerm);
    const nameMatch = item.name.toLowerCase().replace(/\s+/g, "").includes(searchTerm);
    const surnamesMatch = item.surnames.toLowerCase().replace(/\s+/g, "").includes(searchTerm);
    
    return usernameMatch || nameMatch || surnamesMatch;
  });
  

  return (
    <div>
      <Combobox value={artisan} onChange={setArtisan}>
        <div className={isInputEmpty ? "relative w-full" : "w-full"}>
          <Combobox.Input
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder="Busca un artesano..."
            className="rounded-full bg-gray-200 h-12 w-full"
          />
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className="absolute mt-1 max-h-80 w-[27.5rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
              static
            >
              {filteredArtisans.map((artisan) => (
                <Combobox.Option
                  key={artisan.user_id}
                  className={({ active }) =>
                    `${active ? "bg-gray-100 text-gray-800 " : "text-gray-900"}`
                  }
                  value={artisan.username} // Aquí estamos usando el username como valor. Puedes ajustarlo si es necesario.
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
