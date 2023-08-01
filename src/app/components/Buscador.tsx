`use client`

import React, { useState } from 'react';

export default function BuscadorPerfiles({getSearchResults}){
    const [query, setQuery] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/profile/search?query=${query}`)
    
        const profiles = await response.json()

        getSearchResults(profiles)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busca un artesano..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
        </div>
      )
};

