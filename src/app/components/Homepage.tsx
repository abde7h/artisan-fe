import React, { useEffect, useState } from 'react';
import Photo from './Photo';
import styles from './home.module.css';
import { FeedItem } from './interfaces'; 


const HomePage: React.FC = () => {
    const [feedData, setFeedData] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:8080/1.0.0/feed')
        .then(response => response.json())
        .then((data: FeedItem[]) => {
          setFeedData(data);
          setLoading(false);
        })
        .catch(error => console.error('Error al obtener el feed:', error));
    }, []);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div className={styles.gridContainer}>
        {feedData.map(feedItem => (
          <Photo
            key={feedItem.image} // Use image as key since there's no unique ID in the JSON
            src={feedItem.image}
            alt={feedItem.name}
            title={feedItem.name}
            artisanImage={feedItem.artisan.image}
          />
        ))}
      </div>
    );
  }


export default HomePage;