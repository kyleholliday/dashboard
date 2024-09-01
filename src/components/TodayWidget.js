import { useState, useEffect } from 'react';

const TodayWidget = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    // Optionally update date if needed, e.g., every minute
    const intervalId = setInterval(() => setCurrentDate(new Date()), 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const getDateComponents = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const year = date.getFullYear();
    return { weekday, month, day, year };
  };

  const { weekday, month, day, year } = getDateComponents(currentDate);

  return (
    <div className="bg-white rounded-xl shadow-xl py-6 px-6 mb-4">
      <p className="font-bold text-4xl mb-1">{weekday}</p>
      <p>{`${month} ${day}, ${year}`}</p>
    </div>
  );
};

export default TodayWidget;
