import React from 'react';


interface PhotoProps {
  src: string;
  alt: string;
  title: string;
  artisanImage?: string; 
}


const Photo: React.FC<PhotoProps> = ({ src, alt, title, artisanImage }) => {
    const displayArtisanImage = artisanImage || '';
  
    return (
      <div>
        <img src={src} alt={alt} />
        <p>{title}</p>
        <img src={displayArtisanImage} alt={`${title} Artisan`} />
      </div>
    );
  }
  


export default Photo;
