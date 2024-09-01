import { useState, useEffect } from 'react';
import axios from 'axios';

const RandomImage = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'aNVzyXy4IE3_H9j7W9OE1Ke2Nn3mEhT58JKJiWlcl7k'; // Replace with your actual Unsplash API key

  useEffect(() => {
    axios
      .get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
        params: {
          orientation: 'landscape',
          collections: 'wallpapers, nature',
          topics: 'wallpapers, nature, experimental',
        },
      })
      .then((response) => {
        setImage(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch image. Please try again later.');
        console.error('Error:', error);
      });
  }, [apiKey]);

  return (
    <div className="random-image-widget bg-white rounded-xl shadow-xl py-6 px-6 mx-auto">
      {error ? (
        <p>{error}</p>
      ) : image ? (
        <div>
          <h2 className="pb-2">Today's Random Image</h2>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Photo by{' '}
            <a
              href={image.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {image.user.name}
            </a>{' '}
            on Unsplash
          </p>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default RandomImage;
