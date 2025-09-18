import React from 'react';
import { Link } from 'react-router-dom';
import { prophetStories } from '../data/prophetStories';
import { ProphetStory } from '../types';

const ProphetCard: React.FC<{ story: ProphetStory }> = ({ story }) => (
  <Link 
    to={`/prophets/${story.id}`} 
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-teal-900/50 hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col items-center text-center group"
  >
    <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 p-4 rounded-full mb-4 transition-colors duration-300 group-hover:bg-teal-600 dark:group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-white">
      <i className="ph-fill ph-scroll text-4xl"></i>
    </div>
    <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">{story.name}</h3>
    <p className="text-gray-600 dark:text-gray-400">{story.description}</p>
  </Link>
);


const ProphetsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-300">قصص الأنبياء</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">عبر وحكم من سيرتهم العطرة</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prophetStories.map((story) => (
          <ProphetCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default ProphetsPage;