import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';
import TodayWidget from '../components/TodayWidget';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-1">
          <TodayWidget />
          <WeatherWidget />
        </div>
        <div className="col-span-2">
          <NewsWidget />
        </div>
      </div>
    </div>
  );
};

export default Home;
