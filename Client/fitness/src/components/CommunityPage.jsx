import React from 'react';
import '../styles/CommunityPage.css'; // Import the CSS file

const articles = [
  {
    title: '7 Nutrients You Need for a Healthy Body',
    description: 'From vitamins to minerals, discover the essential nutrients your body needs.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQaPtbkMk6gLv25J1WFiOeOGgRHQ_o4NLF4A&s', // Placeholder image
    link: 'https://www.wellnessdaily.com.au/health/7-essential-nutrients-your-body-needs'
  },
  {
    title: '10 Effective Exercises to Build Muscle',
    description: 'These exercises are great for building muscle and improving overall fitness.',
    image: 'https://www.dmoose.com/cdn/shop/articles/Main-Image_6d104d00-8dba-413b-8f70-542fbd7dc75b.jpg?v=1666444364', // Placeholder image
    link: 'https://www.strengthlog.com/best-exercises-to-build-muscle/'
  },
  {
    title: 'How to Create a Balanced Diet Plan',
    description: 'Learn how to create a balanced diet plan that supports your fitness goals.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsKaXyBZcFZ6_WXjwlrAlhBJskG3V5P2CLjg&s', // Placeholder image
    link: 'https://kaynutrition.com/how-to-create-a-balanced-meal/'
  },
  {
    title: 'The Ultimate Guide to Protein for Muscle Growth',
    description: 'Everything you need to know about protein and its role in muscle growth.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLzMEXt9EcsOCQYJ4Y739_VS5AnUtz6QQSg&s', // Placeholder image
    link: 'https://www.muscletech.com/blogs/journal/protein-for-bodybuilding'
  }
];

const CommunityPage = () => {
  return (
    <div className="community-page">
      {articles.map((article, index) => (
        <a href={article.link} target="_blank" rel="noopener noreferrer" key={index} className="article">
          <img src={article.image} alt={article.title} className="article-image" />
          <div className="article-content">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CommunityPage;
