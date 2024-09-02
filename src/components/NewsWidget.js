import { useState, useEffect } from 'react';
import axios from 'axios';

const NewsWidget = () => {
  const [topStories, setTopStories] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  // const [entNews, setEntNews] = useState([]);
  // const [healthNews, setHealthNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [error, setError] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState('business');

  const apiKey = 'GxG38yqGeHHWyZP1opxap84H7yS9YfCKotCjSB2F';
  // const country = 'us';
  // const pageSize = 10;

  useEffect(() => {
    axios
      .get(
        `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&language=en&exclude_categories=entertainment&exclude_domains=rt.com,benzinga.com,foxnews.com,espn.com`
      )
      .then((response) => {
        setTopStories(response.data.data); // Update based on the response structure
        console.log(response.data.data);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch news data. Please try again later.');
        console.error('Error:', error);
      });

    axios
      .get(
        `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&language=en&categories=tech`
      )
      .then((response) => {
        setTechNews(response.data.data); // Update based on the response structure
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch news data. Please try again later.');
        console.error('Error:', error);
      });

    axios
      .get(
        `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&language=en&categories=business&exclude_domains=benzinga.com`
      )
      .then((response) => {
        setBusinessNews(response.data.data); // Update based on the response structure
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch news data. Please try again later.');
        console.error('Error:', error);
      });
  }, [apiKey]);

  return (
    <div className="news-widget bg-white rounded-xl shadow-xl py-6 px-6 mx-auto">
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="divide-y divide-gray-300/50">
            <h1 className="pb-2 text-lg font-semibold">
              Today's Top Headlines
            </h1>
            <ul className="pt-2">
              {topStories.map((article, index) => (
                <li key={index} className="mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500">{article.source}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="divide-y divide-gray-300/50 mt-6">
            <h1 className="pb-2 text-lg font-semibold">Tech News</h1>
            <ul className="pt-2">
              {techNews.map((article, index) => (
                <li key={index} className="mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500">{article.source}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="divide-y divide-gray-300/50 mt-6">
            <h1 className="pb-2 text-lg font-semibold">Business News</h1>
            <ul className="pt-2">
              {businessNews.map((article, index) => (
                <li key={index} className="mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-500">{article.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
