import { useState, useEffect } from 'react';
import axios from 'axios';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [entNews, setEntNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('business');

  const apiKey = 'f0f7cd2d176c41248db3751fc46f92bf';
  const country = 'us';
  const pageSize = 10;

  useEffect(() => {
    // top headlines
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=${pageSize}`
      )
      .then((response) => {
        setNews(response.data.articles);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch news data. Please try again later.');
        console.error('Error:', error);
      });

    // business headlines
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=${apiKey}&pageSize=${pageSize}`
      )
      .then((response) => {
        setBusinessNews(response.data.articles);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch business news data. Please try again later.');
        console.error('Error:', error);
      });

    // entertainment headlines
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apiKey=${apiKey}&pageSize=${pageSize}`
      )
      .then((response) => {
        setEntNews(response.data.articles);
        setError(null);
      })
      .catch((error) => {
        setError(
          'Failed to fetch entertainment news data. Please try again later.'
        );
        console.error('Error:', error);
      });

    // Health headlines
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apiKey=${apiKey}&pageSize=${pageSize}`
      )
      .then((response) => {
        setHealthNews(response.data.articles);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch health news data. Please try again later.');
        console.error('Error:', error);
      });
  }, []);

  const renderNewsList = (newsList) => (
    <ul className="pt-2">
      {/* <h1 className="text-lg font-semibold">{selectedCategory}</h1> */}
      {newsList.slice(0, 5).map((article, index) => (
        <li key={index} className="mb-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {article.title}
          </a>
          <p className="text-sm text-gray-500">{article.source.name}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="news-widget bg-white rounded-xl shadow-xl py-6 px-6 mx-auto">
      {error ? (
        <p>{error}</p>
      ) : news.length ? (
        <div>
          <div className="divide-y divide-gray-300/50">
            <div className="divide-y divide-gray-300/50">
              <h1 className="pb-2 text-lg font-semibold">
                Today's Top Headlines
              </h1>
              <ul className="pt-2">
                {news.slice(0, 5).map((article, index) => (
                  <li key={index} className="mb-4">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {article.title}
                    </a>
                    <p className="text-sm text-gray-500">
                      {article.source.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <nav className="flex space-x-4 mb-2 mt-4 pt-4">
              <button
                onClick={() => setSelectedCategory('business')}
                className={`px-3 py-1 rounded ${
                  selectedCategory === 'business'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setSelectedCategory('entertainment')}
                className={`px-3 py-1 rounded ${
                  selectedCategory === 'entertainment'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Entertainment
              </button>
              <button
                onClick={() => setSelectedCategory('health')}
                className={`px-3 py-1 rounded ${
                  selectedCategory === 'health'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Health
              </button>
            </nav>
          </div>
          {selectedCategory === 'business' && renderNewsList(businessNews)}
          {selectedCategory === 'entertainment' && renderNewsList(entNews)}
          {selectedCategory === 'health' && renderNewsList(healthNews)}
        </div>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default NewsWidget;
