import React, { useEffect, useState } from "react";
import { FeedItem } from "./interfaces";
import Loader from "./Loader";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [feedData, setFeedData] = useState<FeedItem[]>([]);
  const [followingArtisans, setFollowingArtisans] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/1.0.0/feed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for feed");
        }
        return response.json();
      })
      .then((data: FeedItem[]) => {
        setFeedData(data);
      })
      .catch((error) => console.error("Error al obtener el feed:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/1.0.0/alex1985/following")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok for following");
        }
        return response.json();
      })
      .then((data) => {
        const usernames = data.map(
          (item: { username: string }) => item.username
        );
        setFollowingArtisans(usernames);
      })
      .catch((error) =>
        console.error("Error al obtener los artesanos seguidos:", error)
      )
      .finally(() => setLoading(false));
  }, []);

  function prioritizeFollowedArtisans(
    feedData: FeedItem[],
    followingArtisans: string[]
  ): FeedItem[] {
    const followedArtisansProducts: FeedItem[] = [];
    const otherProducts: FeedItem[] = [];

    // Divide el feedData en dos listas basado en si el artesano es seguido o no
    feedData.forEach((item) => {
      if (followingArtisans.includes(item.artisan.username)) {
        followedArtisansProducts.push(item);
      } else {
        otherProducts.push(item);
      }
    });

    // Mezcla ambas listas
    const shuffle = (array: FeedItem[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledFollowed = shuffle(followedArtisansProducts);
    const shuffledOthers = shuffle(otherProducts);

    // Intercala los productos
    const result: FeedItem[] = [];
    while (shuffledFollowed.length || shuffledOthers.length) {
      const numberOfFollowedToShow = Math.floor(Math.random() * 4) + 1;

      for (
        let i = 0;
        i < numberOfFollowedToShow && shuffledFollowed.length;
        i++
      ) {
        result.push(shuffledFollowed.pop() as FeedItem);
      }

      if (shuffledOthers.length) {
        result.push(shuffledOthers.pop() as FeedItem);
      }
    }

    return result;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {feedData.length && followingArtisans.length
        ? prioritizeFollowedArtisans(feedData, followingArtisans).map(
            (feedItem) => (
              <div className="relative" key={feedItem.name}>
                <Link href={`/${feedItem.artisan.username}/${feedItem.id}`}>
                  <img
                    src={feedItem.image}
                    alt={feedItem.name}
                    className="object-cover w-full h-96 rounded-lg shadow-md"
                  />
                </Link>

                {/* Información del artesano */}
                <Link href={`/${feedItem.artisan.username}`}>
                  <div className="absolute top-4 left-4 flex flex-col items-center">
                    <img
                      src={feedItem.artisan.image}
                      alt={feedItem.artisan.username}
                      className="w-10 h-10 rounded-full shadow-lg mb-2 object-cover"
                    />
                    <span className="text-black text-sm">
                      {feedItem.artisan.username}
                    </span>
                  </div>
                </Link>
              </div>
            )
          )
        : null}
    </div>
  );
};

export default HomePage;
